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
    organisationId?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const {
        userId,
        organisationName,
        organisationDescription,
        organisationGoal,
        country,
        website,
        email,
        numberOfPeople,
        industry,
        age,
        additionalFields,
    }: OrganisationRegisterRequest = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const { db } = await connectToDatabase();

        const organisationData = {
            userId,
            organisationName,
            organisationDescription,
            organisationGoal,
            country,
            website,
            email,
            numberOfPeople,
            industry,
            age,
            additionalFields,
            updatedAt: new Date(),
        };

        const result = await db.collection('organisations').updateOne(
            { userId },
            {
                $set: organisationData,
                $setOnInsert: { createdAt: new Date() },
            },
            { upsert: true }
        );

        if (result.upsertedId) {
            return res.status(201).json({ message: 'Organisation registered successfully' });
        } else {
            return res.status(200).json({ message: 'Organisation updated successfully' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
