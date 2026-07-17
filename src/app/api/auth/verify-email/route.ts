import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");

    // Missing token
    if (!token) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?status=failed`
      );
    }

    // Hash incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find matching user
    const user = await prisma.user.findFirst({
      where: {
        emailVerifyToken: hashedToken,
      },
    });

    // Invalid token
    if (!user) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?status=failed`
      );
    }

    // Expired token
    if (
      !user.emailVerifyExpiry ||
      user.emailVerifyExpiry < new Date()
    ) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?status=expired&email=${encodeURIComponent(user.email)}`
      );
    }

    // Already verified check (optional)
    if (user.isEmailVerified) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`
      );
    }

    // Verify user
    await prisma.user.update({
      where: {
        email: user.email,
      },

      data: {
        isEmailVerified: true,

        emailVerifyToken: null,
        emailVerifyExpiry: null,
      },
    });

    // Redirect to login page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`
    );
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?status=failed`
    );
  }
}