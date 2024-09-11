import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// TODO: add all routes
const protectedRoutes = ["/account-overview", "/another-protected-route"];
const payingCustomerRoutes = ["/hello", "/exclusive-deals"];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "THESECRETEKEYTHATSHALLNOTBEKNOWN");

export async function middleware(request: NextRequest) {
    interface JwtPayload {
        userId: string;
        username: string;
        isAdmin: boolean;
        isPayingCustomer: boolean;
        exp?: number;
    }

    const authToken = request.cookies.get("authToken")?.value;

    const isProtectedRoute = protectedRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    const isPayingCustomerRoute = payingCustomerRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    console.log("Requested Path:", request.nextUrl.pathname);
    console.log("Is Protected Route:", isProtectedRoute);
    console.log("Is Paying Customer Route:", isPayingCustomerRoute);
    console.log("Auth Token Present:", !!authToken);

    if ((isProtectedRoute || isPayingCustomerRoute) && !authToken) {
        console.log("Redirecting to /login due to missing authToken");
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (authToken) {
        try {
            const { payload } = await jwtVerify(authToken, JWT_SECRET);
            const decoded = payload as unknown as JwtPayload;

            if (isPayingCustomerRoute && !decoded.isPayingCustomer) {
                return NextResponse.redirect(new URL("/pricing", request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

// TODO: add all routes paying and protected
export const config = {
    matcher: ["/hello", "/account-overview", "/another-protected-route", "/premium-content", "/exclusive-deals"],
};
