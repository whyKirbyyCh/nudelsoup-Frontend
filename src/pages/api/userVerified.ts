import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface UpdatePayingStatusRequest {
    userId: string;
    isVerified: boolean;
}

interface ResponseData {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId, isVerified }: UpdatePayingStatusRequest = req.body;

    if (!userId || !isVerified) {
        return res.status(400).json({ message: 'User ID and isVerified status are required' });
    }

    try {
        const { db } = await connectToDatabase();

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: { isVerified } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User verified status updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
