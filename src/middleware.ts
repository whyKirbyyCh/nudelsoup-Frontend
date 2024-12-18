import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const routeGroups = {
    protected: ["/account-overview", "/account-creation", "/account-setup", "/product-overview", "/campaign-overview", "/product", "/campaign", "/post", "/organisation-overview"],
    payingCustomer: ["/product-overview", "/campaign-overview", "/product", "/campaign", "/post", "/organisation-overview"],
    agreed: ["/campaign-overview", "/product", "/campaign", "/post", "/organisation-overview"],
    verified: [],
    setupDone: ["/campaign-overview", "/product", "/campaign", "/post", "/organisation-overview"],
};

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
    interface JwtPayload {
        userId: string;
        username: string;
        isAdmin: boolean;
        isPayingCustomer: boolean;
        isAgreed: boolean;
        isVerified: boolean;
        isSetupDone: boolean;
        exp?: number;
    }

    const authToken = request.cookies.get("authToken")?.value;
    const path = request.nextUrl.pathname;

    console.log("Requested Path:", path);
    console.log("Auth Token Present:", !!authToken);

    const isRouteInGroup = (group: string[]): boolean => group.some(route => path.startsWith(route));

    const needsAuth = ["protected", "payingCustomer", "agreed", "verified", "setupDone"].some(group =>
        isRouteInGroup(routeGroups[group as keyof typeof routeGroups])
    );

    if (needsAuth && !authToken) {
        console.log("Redirecting to /login due to missing authToken");
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (authToken) {
        try {
            const { payload } = await jwtVerify(authToken, JWT_SECRET);
            const decoded = payload as unknown as JwtPayload;

            if (isRouteInGroup(routeGroups.payingCustomer) && !decoded.isPayingCustomer) {
                return NextResponse.redirect(new URL("/pricing", request.url));
            }

            if (isRouteInGroup(routeGroups.agreed) && !decoded.isAgreed) {
                return NextResponse.redirect(new URL("/account-setup", request.url));
            }

            if (isRouteInGroup(routeGroups.verified) && !decoded.isVerified) {
                return NextResponse.redirect(new URL("/verify-account", request.url));
            }

            if (isRouteInGroup(routeGroups.setupDone) && !decoded.isSetupDone) {
                return NextResponse.redirect(new URL("/account-setup", request.url));
            }

        } catch (error) {
            console.log("Error verifying JWT:", error);
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/account-overview",
        "/account-creation",
        "/product-overview",
        "/campaign-overview",
        "/product",
        "/campaign",
        "/post",
        "/account-completion",
        "/organisation-overview",
    ],
};
