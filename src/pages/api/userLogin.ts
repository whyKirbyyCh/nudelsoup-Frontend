import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

interface UserLoginRequest {
    email: string;
    password: string;
}

interface ResponseData {
    message: string;
    userId?: string;
    username?: string;
}

// TODO: Move this to .env
const JWT_SECRET = process.env.JWT_SECRET ?? 'THESECRETEKEYTHATSHALLNOTBEKNOWN';

// TODO: Make sure that httpOnly: false is not insecure.
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password }: UserLoginRequest = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const { db } = await connectToDatabase();

        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
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

        return res.status(200).json({
            message: 'Login successful',
            userId: user._id.toString(),
            username: user.username,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
