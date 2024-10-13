import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { serialize } from 'cookie';

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;

interface UpdatePayingStatusRequest {
    userId: string;
    isSetupDone: boolean;
}

interface ResponseData {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId, isSetupDone } = req.body as UpdatePayingStatusRequest;

    if (!userId) {
        return res.status(400).json({ message: 'User ID and valid isSetupDone status are required' });
    }

    try {
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }

        const { db } = await connectToDatabase();

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: { isSetupDone } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const authToken = req.cookies.authToken;
        if (!authToken) {
            return res.status(401).json({ message: 'Authentication token not found' });
        }

        const decodedToken = jwt.decode(authToken) as JwtPayload | null;
        if (!decodedToken || typeof decodedToken !== 'object' || !decodedToken.userId) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        delete decodedToken.exp;

        decodedToken.isSetupDone = isSetupDone;

        const newToken = jwt.sign(decodedToken, JWT_SECRET, { expiresIn: '14d' });

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

        return res.status(200).json({ message: 'User agreed status updated successfully' });
    } catch (error) {
        console.error('Error updating user status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
