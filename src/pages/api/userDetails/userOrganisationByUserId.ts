import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';

interface OrganisationRegisterRequest {
    userId: string;
    organisationName?: string;
    organisationDescription?: string;
    organisationGoal?: string;
    country?: string;
    website?: string;
    email?: string;
    numberOfPeople?: number;
    industry?: string;
    age?: number;
    additionalFields?: { [key: string]: string };
}

interface ResponseData {
    message: string;
    organisation?: OrganisationRegisterRequest;
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
        return res
            .status(400)
            .json({ message: 'User ID is required and must be a string' });
    }

    try {
        const { db } = await connectToDatabase();

        const organisation = await db
            .collection('organisations')
            .findOne({ userId });

        if (!organisation) {
            return res
                .status(404)
                .json({ message: 'No organisation found for the provided user ID' });
        }

        const {
            _id,
            createdAt,
            updatedAt,
            ...organisationData
        } = organisation;

        return res.status(200).json({
            message: 'Organisation found',
            organisation: organisationData as OrganisationRegisterRequest,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Internal server error: ' + error });
    }
}