import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface ProductRegisterRequest {
    userId: string;
    productTitle: string;
    productIcon: number;
    productBusinessModel: string;
    productType: string;
    productLink: string;
    productMarket: string;
    productDescription: string;
    additionalFields?: { [key: string]: string };
}

interface ResponseData {
    message: string;
    product?: ProductRegisterRequest & { productId?: ObjectId };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { productId } = req.query;

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
    } = req.body as ProductRegisterRequest;

    if (!userId || !productTitle || !productBusinessModel || !productType) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    try {
        const { db } = await connectToDatabase();

        if (productId && typeof productId === 'string') {
            const updatedProduct = await db.collection('products').findOneAndUpdate(
                { _id: new ObjectId(productId), userId },
                {
                    $set: {
                        productTitle,
                        productIcon,
                        productBusinessModel,
                        productType,
                        productLink,
                        productMarket,
                        productDescription,
                        additionalFields,
                        updatedAt: new Date(),
                    },
                },
                { returnDocument: 'after' }
            );

            if(!updatedProduct) {
                return res.status(500).json({ message: 'Internal server error'});
            }

            if (!updatedProduct.value) {
                return res.status(404).json({ message: 'Product not found or does not belong to the user' });
            }

            const returnedProduct = updatedProduct.value;
            return res.status(200).json({
                message: 'Product updated successfully',
                product: {
                    productId: returnedProduct._id,
                    userId: returnedProduct.userId,
                    productTitle: returnedProduct.productTitle,
                    productIcon: returnedProduct.productIcon,
                    productBusinessModel: returnedProduct.productBusinessModel,
                    productType: returnedProduct.productType,
                    productLink: returnedProduct.productLink,
                    productMarket: returnedProduct.productMarket,
                    productDescription: returnedProduct.productDescription,
                    additionalFields: returnedProduct.additionalFields,
                },
            });
        } else {
            const result = await db.collection('products').insertOne({
                userId,
                productTitle,
                productIcon,
                productBusinessModel,
                productType,
                productLink,
                productMarket,
                productDescription,
                additionalFields,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return res.status(201).json({
                message: 'Product created successfully',
                product: {
                    productId: result.insertedId,
                    userId,
                    productTitle,
                    productIcon,
                    productBusinessModel,
                    productType,
                    productLink,
                    productMarket,
                    productDescription,
                    additionalFields,
                },
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
