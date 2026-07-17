import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        {
          error: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // User not found
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // Already verified
    if (user.isEmailVerified) {
      return NextResponse.json(
        {
          error: "Email is already verified",
        },
        {
          status: 400,
        }
      );
    }

    // Generate new raw token
    const rawToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // New expiry (10 mins)
    const verifyExpiry = new Date(Date.now() + 1000 * 60 * 10);

    // Update user verification token
    await prisma.user.update({
      where: {
        email,
      },

      data: {
        emailVerifyToken: hashedToken,
        emailVerifyExpiry: verifyExpiry,
      },
    });

    // Send verification email
    await sendVerificationEmail({
      email: user.email,
      token: rawToken,
      name: user.name,
    });

    return NextResponse.json(
      {
        message: "Verification email sent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("RESEND VERIFICATION ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}