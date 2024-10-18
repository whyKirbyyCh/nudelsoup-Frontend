import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';

interface Post {
    id: string;
    campaignId: string;
    site: string;
    title: string;
    text: string;
    additionalFields?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

interface ResponseData {
    message: string;
    posts?: Post[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { campaignId } = req.query;

    if (!campaignId) {
        return res.status(400).json({ message: 'Campaign ID is required.' });
    }

    try {
        const { db } = await connectToDatabase();

        const posts = await db
            .collection('posts')
            .find({ campaignId: campaignId.toString() })
            .toArray();

        if (!posts || posts.length === 0) {
            return res.status(200).json({
                message: 'No posts found for the campaign.',
                posts: [],
            });
        }

        return res.status(200).json({
            message: 'Posts retrieved successfully',
            posts: posts as unknown as Post[],
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
