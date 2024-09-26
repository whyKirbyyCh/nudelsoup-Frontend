import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface ResponseData {
    message: string;
    email?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId' });
    }

    try {
        const { db } = await connectToDatabase();

        if (!ObjectId.isValid(userId as string)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const user = await db.collection('users').findOne({ _id: new ObjectId(userId as string) });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User found', email: user.email });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
