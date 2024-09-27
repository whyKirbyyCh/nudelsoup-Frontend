import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not set in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { sessionId } = req.query;

        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId as string);

            const email = session.customer_details?.email;

            res.status(200).json({ email: email });
        } catch (error) {
            console.error("Error fetching session from Stripe:", error);
            res.status(500).json({ message: "Error fetching session details" });
        }
    } else {
        res.status(405).end();
    }
}
