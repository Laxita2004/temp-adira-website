import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // 🔹 Redirect logged-in users away from login
  if (pathname === "/login" && token) {
    if (token.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔹 Protect user routes
  if (
    pathname.startsWith("/cart") ||
    pathname.startsWith("/profile")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 🔹 Protect admin routes
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