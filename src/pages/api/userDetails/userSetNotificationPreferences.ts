import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';

interface NotificationPreferencesRequest {
    userId: string;
    campaignUpdates?: boolean;
    postUpdates?: boolean;
    analyticsUpdates?: boolean;
    dailySummary?: boolean;
    weeklySummary?: boolean;
    newsletter?: boolean;
    productUpdates?: boolean;
}

interface ResponseData {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const {
        userId,
        campaignUpdates = false,
        postUpdates = false,
        analyticsUpdates = false,
        dailySummary = false,
        weeklySummary = false,
        newsletter = false,
        productUpdates = false,
    }: NotificationPreferencesRequest = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const { db } = await connectToDatabase();

        const notificationData = {
            userId,
            campaignUpdates,
            postUpdates,
            analyticsUpdates,
            dailySummary,
            weeklySummary,
            newsletter,
            productUpdates,
            updatedAt: new Date(),
        };

        const result = await db.collection('notifications').updateOne(
            { userId },
            {
                $set: notificationData,
                $setOnInsert: { createdAt: new Date() },
            },
            { upsert: true }
        );

        if (result.upsertedId) {
            return res.status(201).json({ message: 'Notification preferences saved successfully' });
        } else {
            return res.status(200).json({ message: 'Notification preferences updated successfully' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
