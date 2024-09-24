import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET ?? 'THESECRETEKEYTHATSHALLNOTBEKNOWN';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: 'No token found' });
    }

    try {
        const decodedToken = jwt.decode(token);

        if (!decodedToken || typeof decodedToken !== 'object') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { exp } = decodedToken;

        if (!exp) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const currentTime = Math.floor(Date.now() / 1000);

        if (exp < currentTime) {
            return res.status(401).json({ message: 'Token has expired' });
        }

        jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

        const remainingTime = exp - currentTime;

        const { iat, nbf, jti, exp: _, ...newPayload } = decodedToken;

        const newToken = jwt.sign(newPayload, JWT_SECRET, { expiresIn: remainingTime });

        res.setHeader(
            'Set-Cookie',
            serialize('authToken', newToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: remainingTime,
                path: '/',
                sameSite: 'strict',
            })
        );

        return res.status(200).json({ message: 'Token refreshed successfully' });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
