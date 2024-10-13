import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface Market {
    marketDescription: string;
    targetAudience: string;
    additionalFields?: { [key: string]: string };
}

interface ResponseData {
    message: string;
    markets?: { [key: string]: Market };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { productIds } = req.body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ message: 'productIds array is required' });
    }

    try {
        const { db } = await connectToDatabase();

        const objectIdArray = productIds.map((id: string) => new ObjectId(id));

        const markets = await db.collection('markets')
            .find({ productId: { $in: objectIdArray } })
            .toArray();

        const marketDict: { [key: string]: Market } = {};

        markets.forEach((market) => {
            marketDict[market.productId.toString()] = {
                marketDescription: market.marketDescription,
                targetAudience: market.targetAudience,
                additionalFields: market.additionalFields,
            };
        });

        return res.status(200).json({
            message: 'Markets retrieved successfully',
            markets: marketDict,
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
