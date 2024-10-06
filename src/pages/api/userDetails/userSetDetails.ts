import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface ResponseData {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    console.log("Received body:", req.body); // Add this to confirm the incoming data

    const { userId, username, email } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId' });
    }

    if (!username && !email) {
        return res.status(400).json({ message: 'No updates provided' });
    }

    try {
        const { db } = await connectToDatabase();

        if (!ObjectId.isValid(userId as string)) {
            console.log('Invalid userId format');
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const objectId = new ObjectId(userId as string);

        const user = await db.collection('users').findOne({ _id: objectId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateFields: any = {};

        if (username && username !== user.username) {
            const usernameExists = await db
                .collection('users')
                .findOne({ username: username, _id: { $ne: objectId } });

            if (usernameExists) {
                return res.status(409).json({ message: 'Username already exists' });
            }

            updateFields.username = username;
        }

        if (email && email !== user.email) {
            const emailExists = await db
                .collection('users')
                .findOne({ email: email, _id: { $ne: objectId } });

            if (emailExists) {
                return res.status(408).json({ message: 'Email already exists' });
            }

            updateFields.email = email;
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No changes to update' });
        }

        const result = await db.collection('users').updateOne(
            { _id: objectId },
            { $set: updateFields }
        );

        if (result.modifiedCount === 1) {
            return res.status(200).json({ message: 'User details updated successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to update user details' });
        }
    } catch (error) {
        console.error('Error updating user details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
