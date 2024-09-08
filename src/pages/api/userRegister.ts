import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

interface UserRegisterRequest {
    email: string;
    username: string;
    password: string;
}

interface ResponseData {
    message: string;
    userId?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    // Ensure the request is a POST request
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Extract and validate request body
    const { email, username, password }: UserRegisterRequest = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, and password are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
        // Connect to the database
        const { db } = await connectToDatabase();

        // Check if a user with the same email already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await db.collection('users').insertOne({
            email,
            username,
            password: hashedPassword,
            createdAt: new Date(),
        });

        // Return a success response with the inserted user's ID
        return res.status(201).json({ message: 'User registered successfully', userId: result.insertedId.toString() });
    } catch (error) {
        console.error('Error registering user:', error);
        // Return a JSON response for server errors
        return res.status(500).json({ message: 'Internal server error' });
    }
}
