import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface Product {
    userId: string;
    productTitle: string;
    productIcon: number;
    productBusinessModel: string;
    productType: string;
    productLink: string;
    productMarket: string;
    productDescription: string;
    additionalFields?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

interface ResponseData {
    message: string;
    productId?: ObjectId;
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
        productTitle,
        productIcon,
        productBusinessModel,
        productType,
        productLink,
        productMarket,
        productDescription,
        additionalFields,
    } = req.body;

    if (!userId || !productTitle || productIcon == null || !productBusinessModel || !productType || !productLink || !productMarket || !productDescription) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const { db } = await connectToDatabase();

        const newProduct: Product = {
            userId,
            productTitle,
            productIcon,
            productBusinessModel,
            productType,
            productLink,
            productMarket,
            productDescription,
            additionalFields: additionalFields || {},
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('products').insertOne(newProduct);

        return res.status(201).json({
            message: 'Product added successfully',
            productId: result.insertedId,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
