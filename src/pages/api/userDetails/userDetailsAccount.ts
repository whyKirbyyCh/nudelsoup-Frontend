import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

interface AddUserDetailsAccountRequest {
    userId: string;
    additionalField1: string;
    additionalField2: string;
}

interface ResponseData {
    message: string;
    detailId?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { userId, additionalField1, additionalField2 }: AddUserDetailsAccountRequest = req.body;
    
    if (!userId || !additionalField1 || !additionalField2) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const { db } = await connectToDatabase();
        
        const userExists = await db.collection("users").findOne({ _id: new ObjectId(userId) });

        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const result = await db.collection("userDetailsAccount").insertOne({
            userId: new ObjectId(userId),
            additionalField1,
            additionalField2,
            createdAt: new Date(),
        });

        return res.status(201).json({ message: "User details added successfully", detailId: result.insertedId.toString() });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}