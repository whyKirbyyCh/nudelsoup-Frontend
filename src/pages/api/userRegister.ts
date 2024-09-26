import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

interface UserRegisterRequest {
    email: string;
    username: string;
    password: string;
}

interface ResponseData {
    message: string;
    userId?: string;
}

// TODO: Move this to .env
const JWT_SECRET = process.env.JWT_SECRET ?? 'THESECRETEKEYTHATSHALLNOTBEKNOWN';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, username, password }: UserRegisterRequest = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, and password are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
        const { db } = await connectToDatabase();

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // TODO: Make sure that this is safe, might need to move it to env
        const isAdmin = email === 'timschmid02@icloud.com';

        // Insert the user into the database with initial subscription status
        const result = await db.collection('users').insertOne({
            email,
            username,
            password: hashedPassword,
            isVerified: false,
            isPayingCustomer: false,  // Initial state: not a paying customer
            subscriptionStartDate: null,  // No subscription at registration
            subscriptionEndDate: null,    // No subscription at registration
            isAgreed: false,
            isSetupDone: false,
            isAdmin,
            createdAt: new Date(),
        });

        const userId = result.insertedId.toString();

        // Create a JWT for the user
        const token = jwt.sign(
            { userId, username, isAdmin, isPayingCustomer: false },
            JWT_SECRET,
            { expiresIn: '14d' }  // Standard expiration for free users
        );

        // Set the cookie with the token
        res.setHeader(
            'Set-Cookie',
            serialize('authToken', token, {
                httpOnly: false, // For development, httpOnly should be true in production
                secure: process.env.NODE_ENV === 'production',
                maxAge: 14 * 24 * 60 * 60, // 14 days token validity
                path: '/',
                sameSite: 'strict',
            })
        );

        return res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
}
