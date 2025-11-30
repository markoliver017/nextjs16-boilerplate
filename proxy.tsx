import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// 1. Specify protected and public routes
const protectedRoutesBaseUrl = "/dashboard";
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/sign-up", "/sign-in"];

export async function proxy(request: NextRequest) {
    const nextHeaders = await headers();
    const session = await auth.api.getSession({
        headers: nextHeaders,
    });
    console.log("Auth server session>>>", session);
    // 2. Check if the current route is protected or public
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session?.user) {
        return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
    }
    // 5. Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute &&
        session?.user &&
        !request.nextUrl.pathname.startsWith(protectedRoutesBaseUrl)
    ) {
        return NextResponse.redirect(
            new URL(protectedRoutesBaseUrl, request.nextUrl)
        );
    }
    // console.log("Auth server session>>>", session);

    const response = NextResponse.next({
        request: {
            headers: nextHeaders,
        },
    });
    response.headers.set("x-current-path", request.nextUrl.pathname);
    return response;
}

// See "Matching Paths" below to learn mozre
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:gif|png|jpg|jpeg|css|js)).*)",
    ],
};
