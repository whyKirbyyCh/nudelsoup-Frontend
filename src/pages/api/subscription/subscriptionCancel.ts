import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
});

interface ResponseData {
    message: string;
    email?: string;
    subscription?: Stripe.Subscription;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId' });
    }

    try {
        const { db } = await connectToDatabase();

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const email = user.email;

        if (!email) {
            return res.status(404).json({ message: 'User has no email associated' });
        }

        const customers = await stripe.customers.list({
            email: email,
            limit: 1,
        });

        if (customers.data.length === 0) {
            return res.status(404).json({ message: 'Customer not found in Stripe' });
        }

        const customer = customers.data[0];

        const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            status: 'active',
            limit: 1,
        });

        if (subscriptions.data.length === 0) {
            return res.status(404).json({ message: 'No active subscriptions found for this customer' });
        }

        const subscription = subscriptions.data[0];
        const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
            cancel_at_period_end: true,
        });

        return res.status(200).json({
            message: 'Subscription will be canceled at the end of the billing period',
            email: email,
            subscription: updatedSubscription,
        });
    } catch (error) {
        console.error('Error canceling subscription:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
