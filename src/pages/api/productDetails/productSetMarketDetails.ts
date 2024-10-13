import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface MarketInput {
    productId: string;
    marketDescription?: string;
    targetAudience?: string;
    additionalFields?: { [key: string]: string };
}

interface ResponseData {
    message: string;
    results: { [key: string]: string };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed', results: {} });
    }

    const { markets }: { markets: MarketInput[] } = req.body;

    if (!Array.isArray(markets) || markets.length === 0) {
        return res.status(400).json({ message: 'markets array is required', results: {} });
    }

    try {
        const { db } = await connectToDatabase();
        const results: { [key: string]: string } = {};

        for (const marketInput of markets) {
            const { productId, marketDescription, targetAudience, additionalFields } = marketInput;

            const objectId = new ObjectId(productId);

            const updateData: any = {
                updatedAt: new Date(),
            };

            if (marketDescription) updateData.marketDescription = marketDescription;
            if (targetAudience) updateData.targetAudience = targetAudience;
            if (additionalFields) updateData.additionalFields = additionalFields;

            const result = await db.collection('markets').findOneAndUpdate(
                { productId: objectId },
                { $set: updateData },
                { upsert: true, returnDocument: 'after' }
            );

            if (result && result.ok && result.value) {
                results[productId] = 'Market saved successfully';
            } else {
                results[productId] = 'Failed to save market';
            }
        }

        return res.status(200).json({
            message: 'Markets processed',
            results,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error, results: {} });
    }
}
