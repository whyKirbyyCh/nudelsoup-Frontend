import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { connectToDatabase } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export const config = {
    api: {
        bodyParser: false, // Required for raw body handling
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
        return;
    }

    try {
        const rawBody = await buffer(req);
        const signature = req.headers["stripe-signature"];

        if (!signature) {
            console.error("Missing Stripe signature header");
            return res.status(400).json({ error: "Missing Stripe signature" });
        }

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                rawBody,
                signature,
                process.env.STRIPE_WEBHOOK as string
            );
        } catch (err: any) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return res.status(400).json({ error: "Webhook signature verification failed" });
        }

        const { db } = await connectToDatabase();

        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object;

                // Ensure the session contains a subscription
                if (!session.subscription) {
                    console.error("No subscription found in the session.");
                    return res.status(400).json({ error: "No subscription found in the session." });
                }

                const subscriptionId = session.subscription as string;

                // Retrieve subscription details from Stripe
                const subscription = await stripe.subscriptions.retrieve(subscriptionId);

                // Retrieve the customer details using the customer ID from the subscription
                const customer = await stripe.customers.retrieve(subscription.customer as string);

                // Type guard to check if the customer is a regular Customer or a DeletedCustomer
                if (customer.deleted) {
                    console.error("Customer has been deleted.");
                    return res.status(400).json({ error: "Customer has been deleted." });
                }

                // Ensure the customer object has the email
                const customerEmail = (customer as Stripe.Customer).email;
                if (!customerEmail) {
                    console.error("Customer email not found.");
                    return res.status(400).json({ error: "Customer email not found." });
                }

                // Determine the subscription plan type based on price ID or interval
                const priceId = subscription.items.data[0].price.id;
                const interval = subscription.items.data[0].price.recurring?.interval; // monthly or yearly

                // Calculate the subscription end date based on the interval
                const startDate = new Date(subscription.current_period_start * 1000);
                const endDate = new Date(subscription.current_period_end * 1000); // Same logic for both monthly and yearly

                // Update user in the database
                const result = await db.collection('users').updateOne(
                    { email: customerEmail },
                    {
                        $set: {
                            isPayingCustomer: true,
                            subscriptionStartDate: startDate,
                            subscriptionEndDate: endDate,
                            priceId, // Save the price ID for future reference
                        },
                    }
                );

                console.log(`User ${customerEmail} subscription updated with ${interval} plan.`);
                break;

            case "customer.subscription.deleted":
                const canceledSubscription = event.data.object;

                // Retrieve customer details from the canceled subscription
                const canceledCustomer = await stripe.customers.retrieve(canceledSubscription.customer as string);

                // Type guard to check if the customer is a regular Customer or a DeletedCustomer
                if (canceledCustomer.deleted) {
                    console.error("Customer has been deleted.");
                    return res.status(400).json({ error: "Customer has been deleted." });
                }

                const canceledCustomerEmail = (canceledCustomer as Stripe.Customer).email;
                if (!canceledCustomerEmail) {
                    console.error("Customer email not found for canceled subscription.");
                    return res.status(400).json({ error: "Customer email not found for canceled subscription." });
                }

                // When a subscription is canceled, update the user record accordingly
                await db.collection('users').updateOne(
                    { email: canceledCustomerEmail },
                    {
                        $set: {
                            isPayingCustomer: false,
                            subscriptionEndDate: null, // Cancel access immediately
                        },
                    }
                );
                console.log(`Subscription canceled for user: ${canceledCustomerEmail}`);
                break;

            default:
                console.warn(`Unhandled event type: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error(`Error processing webhook: ${(error as Error).message}`);
        res.status(500).json({ error: (error as Error).message });
    }
}
