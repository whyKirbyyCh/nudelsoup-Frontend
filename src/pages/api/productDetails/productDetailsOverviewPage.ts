import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface Product {
    productId: ObjectId;
    productTitle: string;
    productDescription: string;
    productIcon: number;
}

interface ResponseData {
    message: string;
    products?: Product[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'userId is required' });
    }

    try {
        const { db } = await connectToDatabase();

        const products = await db.collection('products')
            .find({ userId })
            .project({
                productId: '$_id',
                productTitle: 1,
                productDescription: 1,
                productIcon: 1,
            })
            .toArray();

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found for this user' });
        }

        return res.status(200).json({
            message: 'Products retrieved successfully',
            products: products.map(product => ({
                productId: product._id,
                productTitle: product.productTitle,
                productDescription: product.productDescription,
                productIcon: product.productIcon,
            })),
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
