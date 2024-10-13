import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';

interface NotificationPreferencesResponse {
    message: string;
    notifications?: {
        campaignUpdates: boolean;
        postUpdates: boolean;
        analyticsUpdates: boolean;
        dailySummary: boolean;
        weeklySummary: boolean;
        newsletter: boolean;
        productUpdates: boolean;
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<NotificationPreferencesResponse>) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'User ID is required and must be a string' });
    }

    try {
        const { db } = await connectToDatabase();

        const notificationPreferences = await db.collection('notifications').findOne({ userId });

        if (!notificationPreferences) {
            return res.status(404).json({ message: 'No notification preferences found for the given user' });
        }

        const {
            campaignUpdates = false,
            postUpdates = false,
            analyticsUpdates = false,
            dailySummary = false,
            weeklySummary = false,
            newsletter = false,
            productUpdates = false,
        } = notificationPreferences;

        return res.status(200).json({
            message: 'Notification preferences retrieved successfully',
            notifications: {
                campaignUpdates,
                postUpdates,
                analyticsUpdates,
                dailySummary,
                weeklySummary,
                newsletter,
                productUpdates,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
