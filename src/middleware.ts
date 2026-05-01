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

  // Block /login if already logged in
  if (pathname === "/login" && isAuth) {
    return NextResponse.redirect(
      new URL(isAdmin ? "/admin" : "/", req.url)
    );
  }

  // USER (consumer) only routes
  if (
    pathname.startsWith("/cart") ||
    pathname.startsWith("/profile")
  ) {
    // Not logged in
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Logged in but NOT a USER (i.e., admin)
    if (!isUser) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // ADMIN only routes
  if (pathname.startsWith("/admin/")) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Force admin isolation
  if (isAdmin && !pathname.startsWith("/admin/")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}