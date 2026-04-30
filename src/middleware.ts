import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Public routes
  const publicRoutes = ["/", "/login", "/register"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected routes (require login)
  const userRoutes = ["/cart", "/profile"];

  if (userRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}