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
    campaign?: Campaign;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { campaignId } = req.query;

    if (!campaignId) {
        return res.status(400).json({ message: 'Campaign ID is required.' });
    }

    try {
        const { db } = await connectToDatabase();

        const campaign = await db.collection('campaigns').findOne({ campaignId: campaignId.toString() });

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found.' });
        }

        const formattedCampaign = campaign as unknown as Campaign;

        return res.status(200).json({
            message: 'Campaign retrieved successfully',
            campaign: formattedCampaign,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
