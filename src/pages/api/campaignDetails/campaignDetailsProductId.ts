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

    const { productId } = req.query;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        const { db } = await connectToDatabase();

        const campaigns = await db.collection('campaigns').find({ productId: productId.toString() }).toArray();

        if (!campaigns || campaigns.length === 0) {
            console.log('No campaigns found for this product.');
            return res.status(200).json({
                message: 'No campaigns found for this product.',
                campaigns: [],
            });
        }

        const formattedCampaigns = campaigns as unknown as Campaign[];

        return res.status(200).json({
            message: 'Campaigns retrieved successfully',
            campaigns: formattedCampaigns,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
