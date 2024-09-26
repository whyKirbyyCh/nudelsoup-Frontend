import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// TODO: Move this to .env
const JWT_SECRET = process.env.JWT_SECRET ?? 'THESECRETEKEYTHATSHALLNOTBEKNOWN';

interface UpdatePayingStatusRequest {
    userId: string;
    isPayingCustomer: boolean;
}

interface ResponseData {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId, isPayingCustomer }: UpdatePayingStatusRequest = req.body;

    if (!userId || !isPayingCustomer) {
        return res.status(400).json({ message: 'User ID and isPayingCustomer status are required' });
    }

    try {
        const { db } = await connectToDatabase();

        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Set token expiration based on subscription end date
        const tokenExpiration = user.subscriptionEndDate
            ? Math.floor(new Date(user.subscriptionEndDate).getTime() / 1000) // Unix timestamp
            : Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60; // Default to 14 days if no subscription

        const payload = {
            userId: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            isPayingCustomer: user.isPayingCustomer,
            subscriptionEndDate: user.subscriptionEndDate, // Include in the JWT
        };

        const newToken = jwt.sign(payload, JWT_SECRET, { expiresIn: tokenExpiration });

        res.setHeader(
            'Set-Cookie',
            serialize('authToken', newToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: tokenExpiration - Math.floor(Date.now() / 1000), // Set cookie to expire when the token does
                path: '/',
                sameSite: 'strict',
            })
        );

        return res.status(200).json({ message: 'User payment status updated successfully' });
    } catch (error) {
        console.error('Error updating payment status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
