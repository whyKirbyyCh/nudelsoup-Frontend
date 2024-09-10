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

        const result = await db.collection('users').insertOne({
            email,
            username,
            password: hashedPassword,
            createdAt: new Date(),
        });

        const userId = result.insertedId.toString();

        const token = jwt.sign(
            { userId, username },
            JWT_SECRET,
            { expiresIn: '14d' }
        );

        res.setHeader(
            'Set-Cookie',
            serialize('authToken', token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 14 * 24 * 60 * 60,
                path: '/',
                sameSite: 'strict',
            })
        );

        return res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
