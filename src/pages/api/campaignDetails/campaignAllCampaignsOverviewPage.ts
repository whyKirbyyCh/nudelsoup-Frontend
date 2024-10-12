import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';

interface Campaign {
    userId: string;
    productId: string;
    productTitle: string;
    campaignId: string;
    title: string;
    targetAudience: string;
    campaignType: string;
    campaignGoal: string;
    startDate: string;
    stillActive: boolean;
    svgSrc: number;
    additionalFields?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

interface ResponseData {
    message: string;
    campaigns?: Campaign[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        const { db } = await connectToDatabase();

        const campaigns = await db
            .collection('campaigns')
            .find({ userId: userId.toString() })
            .toArray();

        if (!campaigns || campaigns.length === 0) {
            return res.status(404).json({ message: 'No campaigns found for the user.' });
        }

        return res.status(200).json({
            message: 'Campaigns retrieved successfully',
            campaigns: campaigns as unknown as Campaign[],
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
