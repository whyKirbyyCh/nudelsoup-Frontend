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

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: { isPayingCustomer } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found after update' });
        }

        const payload = {
            userId: updatedUser._id,
            username: updatedUser.username,
            isAdmin: updatedUser.isAdmin,
            isPayingCustomer: updatedUser.isPayingCustomer,
            isVerified: updatedUser.isVerified,
            isAgreed: updatedUser.isAgreed,
            isSetupDone: updatedUser.isSetupDone,
            email: updatedUser.email,
            createdAt: updatedUser.createdAt,
        };

        const newToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '14d' });

        res.setHeader(
            'Set-Cookie',
            serialize('authToken', newToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 14 * 24 * 60 * 60,
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
