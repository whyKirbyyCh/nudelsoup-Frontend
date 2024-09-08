import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

interface UserLoginRequest {
    email: string;
    password: string;
}

interface ResponseData {
    message: string;
    userId?: string;
    username?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    // Ensure the request is a POST request
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Extract and validate request body
    const { email, password }: UserLoginRequest = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Connect to the database
        const { db } = await connectToDatabase();

        // Check if a user with the given email exists
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If login is successful, respond with the user's ID and username
        return res.status(200).json({
            message: 'Login successful',
            userId: user._id.toString(),
            username: user.username,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        // Return a JSON response for server errors
        return res.status(500).json({ message: 'Internal server error' });
    }
}
