import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

interface DeleteUserRequest {
    userId: string;
    password: string;
}

interface ResponseData {
    message: string;
    email?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId, password }: DeleteUserRequest = req.body;

    if (!userId || !password) {
        return res.status(400).json({ message: 'User ID and password are required' });
    }

    try {
        const { db } = await connectToDatabase();

        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const userEmail = user.email;

        await db.collection('users').deleteOne({ _id: new ObjectId(userId) });

        return res.status(200).json({ message: 'User deleted successfully', email: userEmail });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
