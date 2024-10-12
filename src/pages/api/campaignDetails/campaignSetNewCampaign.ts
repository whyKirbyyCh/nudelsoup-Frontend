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
    campaignId?: ObjectId;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const {
        userId,
        productId,
        productTitle,
        campaignId,
        title,
        targetAudience,
        campaignType,
        campaignGoal,
        startDate,
        stillActive,
        svgSrc,
        additionalFields,
    } = req.body;

    if (!userId || !productId || !productTitle || !campaignId || !title || !targetAudience || !campaignType || !campaignGoal || !startDate || stillActive == null || svgSrc == null) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const { db } = await connectToDatabase();

        const newCampaign: Campaign = {
            userId,
            productId,
            productTitle,
            campaignId,
            title,
            targetAudience,
            campaignType,
            campaignGoal,
            startDate,
            stillActive,
            svgSrc,
            additionalFields: additionalFields || {},
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('campaigns').insertOne(newCampaign);

        return res.status(201).json({
            message: 'Campaign added successfully',
            campaignId: result.insertedId,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
