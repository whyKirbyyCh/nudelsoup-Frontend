import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { connectToDatabase } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export const config = {
    api: {
        bodyParser: false,
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
            console.error('Error verifying webhook signature:', {
                rawBody: rawBody.toString(),
                signature,
                error: err.message
            });
            return res.status(400).json({ error: 'Webhook signature verification failed' });
        }

        const { db } = await connectToDatabase();

        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                const subscriptionId = session.subscription as string;
                if (!subscriptionId) {
                    console.error("No subscription found in the session.");
                    return res.status(400).json({ error: "No subscription found in the session." });
                }

                const subscription = await stripe.subscriptions.retrieve(subscriptionId);

                const customer = await stripe.customers.retrieve(subscription.customer as string);

                if (customer.deleted) {
                    console.error("Customer has been deleted.");
                    return res.status(400).json({ error: "Customer has been deleted." });
                }

                const customerEmail = (customer as Stripe.Customer).email;
                if (!customerEmail) {
                    console.error("Customer email not found.");
                    return res.status(400).json({ error: "Customer email not found." });
                }

                const priceId = subscription.items.data[0].price.id;
                const interval = subscription.items.data[0].price.recurring?.interval;
                const startDate = new Date(subscription.current_period_start * 1000);
                const endDate = new Date(subscription.current_period_end * 1000);

                const result = await db.collection('users').updateOne(
                    { email: customerEmail },
                    {
                        $set: {
                            subscriptionStartDate: startDate,
                            subscriptionEndDate: endDate,
                            priceId,
                        },
                    }
                );

                console.log(`User ${customerEmail} subscription updated with ${interval} plan.`);
                console.log(`Matched count: ${result.matchedCount}, Modified count: ${result.modifiedCount}`);
                break;
            }

            case "customer.subscription.created": {
                const subscription = event.data.object as Stripe.Subscription;

                const customer = await stripe.customers.retrieve(subscription.customer as string);

                if (customer.deleted) {
                    console.error("Customer has been deleted.");
                    return res.status(400).json({ error: "Customer has been deleted." });
                }

                const customerEmail = (customer as Stripe.Customer).email;
                if (!customerEmail) {
                    console.error("Customer email not found.");
                    return res.status(400).json({ error: "Customer email not found." });
                }

                const priceId = subscription.items.data[0].price.id;
                const interval = subscription.items.data[0].price.recurring?.interval;
                const startDate = new Date(subscription.current_period_start * 1000);
                const endDate = new Date(subscription.current_period_end * 1000);

                await db.collection('users').updateOne(
                    { email: customerEmail },
                    {
                        $set: {
                            subscriptionStartDate: startDate,
                            subscriptionEndDate: endDate,
                            priceId,
                        },
                    }
                );

                console.log(`User ${customerEmail} subscription created with ${interval} plan.`);
                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                const previousAttributes = event.data.previous_attributes;

                const customer = await stripe.customers.retrieve(subscription.customer as string);
                if (customer.deleted) {
                    console.error("Customer has been deleted.");
                    return res.status(400).json({ error: "Customer has been deleted." });
                }

                const customerEmail = (customer as Stripe.Customer).email;
                if (!customerEmail) {
                    console.error("Customer email not found.");
                    return res.status(400).json({ error: "Customer email not found." });
                }

                console.log("Subscription updated.");

                if (previousAttributes) {
                    console.log("Changes detected in subscription:");
                    (Object.keys(previousAttributes) as Array<keyof Stripe.Subscription>).forEach((key) => {
                        const oldValue = previousAttributes[key];
                        const newValue = subscription[key];

                        console.log(`- ${String(key)}: changed from ${oldValue} to ${newValue}`);
                    });
                } else {
                    console.log("No changes detected in subscription.");
                }

                const priceId = subscription.items.data[0].price.id;
                const interval = subscription.items.data[0].price.recurring?.interval;
                const startDate = new Date(subscription.current_period_start * 1000);
                const endDate = new Date(subscription.current_period_end * 1000);

                const result = await db.collection('users').updateOne(
                    { email: customerEmail },
                    {
                        $set: {
                            subscriptionStartDate: startDate,
                            subscriptionEndDate: endDate,
                            priceId,
                        },
                    }
                );

                console.log(`User ${customerEmail} subscription updated with ${interval} plan.`);
                console.log(`Matched count: ${result.matchedCount}, Modified count: ${result.modifiedCount}`);
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                const customer = await stripe.customers.retrieve(subscription.customer as string);

                if (customer.deleted) {
                    console.error("Customer has been deleted.");
                    return res.status(400).json({ error: "Customer has been deleted." });
                }

                const customerEmail = (customer as Stripe.Customer).email;
                if (!customerEmail) {
                    console.error("Customer email not found for canceled subscription.");
                    return res.status(400).json({ error: "Customer email not found for canceled subscription." });
                }

                await db.collection('users').updateOne(
                    { email: customerEmail },
                    {
                        $set: {
                            isPayingCustomer: false,
                            subscriptionEndDate: null,
                            subscriptionStartDate: null,
                        },
                    }
                );
                console.log(`Subscription canceled for user: ${customerEmail}`);
                break;
            }
            default:
                console.warn(`Unhandled event type: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error(`Error processing webhook: ${(error as Error).message}`);
        res.status(500).json({ error: (error as Error).message });
    }
}
