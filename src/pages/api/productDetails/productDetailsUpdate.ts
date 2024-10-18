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

    const { productId } = req.query;

    if (!productId || typeof productId !== 'string') {
        return res.status(400).json({ message: 'productId is required' });
    }

    try {
        const { db } = await connectToDatabase();
        const productCollection = db.collection('products');
        const campaignsCollection = db.collection('campaigns');

        const {
            productTitle,
            productIcon,
            productBusinessModel,
            productType,
            productMarket,
            productDescription,
            additionalFields,
        } = req.body;

        if (
            !productTitle ||
            !productIcon ||
            !productBusinessModel ||
            !productType ||
            !productMarket ||
            !productDescription
        ) {
            return res
                .status(400)
                .json({ message: 'Missing required product fields' });
        }

        const updatePayload: any = {
            productTitle,
            productIcon,
            productBusinessModel,
            productType,
            productMarket,
            productDescription,
        };

        if (additionalFields && typeof additionalFields === 'object') {
            updatePayload.additionalFields = additionalFields;
        }

        const result = await productCollection.updateOne(
            { _id: new ObjectId(productId) },
            { $set: updatePayload }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updateCampaignResult = await campaignsCollection.updateMany(
            { productId: productId },
            { $set: { productTitle: productTitle } }
        );

        return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error: any) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Internal server error: ' + error.message });
    }
}
