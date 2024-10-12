import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface Product {
    productId: ObjectId;
    productTitle: string;
    productDescription: string;
    productIcon: number;
    productBusinessModel: string;
    productType: string;
    productMarket: string;
}

interface ResponseData {
    message: string;
    product?: Product;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { productId } = req.query;

    if (!productId || typeof productId !== 'string') {
        return res.status(400).json({ message: 'productId is required' });
    }

    try {
        const { db } = await connectToDatabase();
        const product = await db.collection('products')
            .findOne({ _id: new ObjectId(productId) }, {
                projection: {
                    _id: 0,
                    productId: '$_id',
                    productTitle: 1,
                    productDescription: 1,
                    productIcon: 1,
                    productBusinessModel: 1,
                    productType: 1,
                    productMarket: 1
                }
            });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({
            message: 'Product details retrieved successfully',
            product: {
                productId: new ObjectId(productId),
                productTitle: product.productTitle,
                productDescription: product.productDescription,
                productIcon: product.productIcon,
                productBusinessModel: product.productBusinessModel,
                productType: product.productType,
                productMarket: product.productMarket
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
