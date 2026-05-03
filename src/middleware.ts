import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const isAuth = !!token;
  const role = token?.role;

  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";

  // Skip middleware for Next.js internals & static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }
  
  // Block /login if already logged in
  if ((pathname === "/login" || pathname === "/register") && isAuth) {
    return NextResponse.redirect(
      new URL(isAdmin ? "/admin" : "/", req.url)
    );
  }
  
  // USER (consumer) only routes
  if (
    pathname.startsWith("/cart") ||
    pathname.startsWith("/profile")
  ) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // block admin from user pages
    if (!isUser) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // ADMIN only routes
  if (pathname.startsWith("/admin")) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Admin isolation (prevent admin from accessing public/user pages)
  if (
    isAdmin &&
    !pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only where needed
export const config = {
  matcher: [
    "/login",
    "/register",
    "/cart/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/", 
  ],
};