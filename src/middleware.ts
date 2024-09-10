import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/hello', '/another-protected-route'];

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('authToken')?.value;

    if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
        if (!authToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/hello', '/another-protected-route'],
};
