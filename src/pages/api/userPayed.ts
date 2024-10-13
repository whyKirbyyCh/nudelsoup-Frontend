import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;

interface UpdatePayingStatusRequest {
    userEmail: string;
    isPayingCustomer: boolean;
}

interface ResponseData {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userEmail, isPayingCustomer }: UpdatePayingStatusRequest = req.body;

    if (!userEmail) {
        return res.status(400).json({ message: 'User email and isPayingCustomer status are required' });
    }

    try {
        const { db } = await connectToDatabase();

        const normalizedEmail = userEmail.trim().toLowerCase();

        const result = await db.collection('users').findOneAndUpdate(
            { email: normalizedEmail },
            { $set: { isPayingCustomer } },
            { returnDocument: 'after' }
        );

        if (result === null || result.value === null) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!result.subscriptionEndDate) {
            return res.status(400).json({ message: 'Subscription end date is required' });
        }

        if (!result.subscriptionStartDate) {
            return res.status(400).json({ message: 'Subscription start date is required' });
        }

        const tokenExpiration = Math.floor(new Date(result.subscriptionEndDate).getTime() / 1000);

        console.log('Token expiration time:', tokenExpiration);

        // Create JWT token
        const payload = {
            userId: result._id,
            username: result.username,
            isAdmin: result.isAdmin,
            isPayingCustomer: result.isPayingCustomer,
            subscriptionEndDate: result.subscriptionEndDate,
        };

        console.log('JWT Payload:', payload);

        let newToken;
        try {
            newToken = jwt.sign(payload, JWT_SECRET, { expiresIn: tokenExpiration });
            console.log('JWT Token created:', newToken);
        } catch (error) {
            console.error('Error creating JWT token:', error);
            return res.status(500).json({ message: 'Error creating token' });
        }

        // Set the new JWT token in the cookies
        try {
            res.setHeader(
                'Set-Cookie',
                serialize('authToken', newToken, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: tokenExpiration - Math.floor(Date.now() / 1000),
                    path: '/',
                    sameSite: 'strict',
                })
            );
            console.log('Cookie set successfully');
        } catch (error) {
            console.error('Error setting cookie:', error);
            return res.status(500).json({ message: 'Error setting cookie' });
        }

        return res.status(200).json({ message: 'User payment status updated successfully' });
    } catch (error) {
        console.error('Error updating payment status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
