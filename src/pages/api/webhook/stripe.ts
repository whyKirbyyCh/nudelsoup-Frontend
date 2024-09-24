import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";

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
        console.log("Request body: ", req.body);

        const rawBody = await buffer(req);

        console.log("Buffered body: ", rawBody.toString("utf8"));

        const signature = req.headers["stripe-signature"];
        if (!signature) {
            console.error("Missing Stripe signature header");
            return res.status(400).json({ error: "Missing Stripe signature" });
        }

        let event;
        try {
            event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK as string);
        } catch (err: any) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return res.status(400).json({ error: "Webhook signature verification failed" });
        }

        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                console.log("PaymentIntent was successful!", paymentIntent);
                break;
            case "payment_method.attached":
                const paymentMethod = event.data.object;
                console.log("PaymentMethod was attached to a customer!", paymentMethod);
                break;
            case "checkout.session.completed":
                const session = event.data.object;
                console.log("Checkout Session completed!", session);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error(`Error processing webhook: ${(error as Error).message}`);
        res.status(500).json({ error: (error as Error).message });
    }
}
