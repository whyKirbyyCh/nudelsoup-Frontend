import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

interface ResponseData {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId, oldPassword, newPassword } = req.body;

    // Validate input data
    if (!userId || !oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Missing userId, oldPassword, or newPassword' });
    }

    try {
        const { db } = await connectToDatabase();

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const objectId = new ObjectId(userId);

        // Fetch the user from the database
        const user = await db.collection('users').findOne({ _id: objectId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the old password with the stored hashed password
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect old password' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);  // Here is where you hash the new password with salt rounds

        // Update the password in the database
        await db.collection('users').updateOne(
            { _id: objectId },
            { $set: { password: hashedNewPassword } } // Store the hashed password
        );

        return res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
