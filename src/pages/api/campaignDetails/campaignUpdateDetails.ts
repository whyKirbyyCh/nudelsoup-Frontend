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
    if (req.method !== 'PUT') {
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

    if (
        !userId ||
        !productId ||
        !productTitle ||
        !campaignId ||
        !title ||
        !targetAudience ||
        !campaignType ||
        !campaignGoal ||
        !startDate ||
        stillActive == null ||
        svgSrc == null
    ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const { db } = await connectToDatabase();

        const result = await db.collection('campaigns').updateOne(
            { _id: new ObjectId(campaignId.toString()) },
            {
                $set: {
                    userId,
                    productId,
                    productTitle,
                    title,
                    targetAudience,
                    campaignType,
                    campaignGoal,
                    startDate,
                    stillActive,
                    svgSrc,
                    additionalFields: additionalFields || {},
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Campaign not found.' });
        }

        return res.status(200).json({ message: 'Campaign updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
