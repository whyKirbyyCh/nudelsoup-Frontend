import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

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
    productId?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { campaignId, userId } = req.query;

    if (!campaignId || !userId) {
        return res.status(400).json({ message: 'Campaign ID and User ID are required.' });
    }

    try {
        const { db } = await connectToDatabase();

        const campaign = await db.collection('campaigns').findOne({
            _id: new ObjectId(campaignId.toString()),
            userId: userId.toString(),
        });

        if (!campaign) {
            console.log('No campaign found with the provided Campaign ID and User ID.');
            return res.status(200).json({
                message: 'No campaign found with the provided Campaign ID and User ID.',
            });
        }

        const { productId } = campaign as unknown as Campaign;

        return res.status(200).json({
            message: 'Product ID retrieved successfully',
            productId: productId,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
