import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email?.toLowerCase().trim();
    const password = body.password;
    const name = body.name?.trim();

    // Basic validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // VERIFIED USER EXISTS
    if (existingUser && existingUser.isEmailVerified) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Generate secure random token
    const rawToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // Token expiry (10 mins)
    const verifyExpiry = new Date(Date.now() + 1000 * 60 * 10);

    // USER EXISTS BUT EMAIL NOT VERIFIED
    if (existingUser && !existingUser.isEmailVerified) {

      // Update verification token only
      await prisma.user.update({
        where: {
          email,
        },

        data: {
          emailVerifyToken: hashedToken,
          emailVerifyExpiry: verifyExpiry,
        },
      });

      // Resend verification email
      await sendVerificationEmail({
        email,
        token: rawToken,
        name: existingUser.name,
      });

      return NextResponse.json(
        {
          message:
            "Account already exists but email is not verified.",

          type: "existing",
        },
        { status: 200 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,

        role: "USER",

        isEmailVerified: false,

        emailVerifyToken: hashedToken,
        emailVerifyExpiry: verifyExpiry,
      },
    });

    // Send verification email
    await sendVerificationEmail({
      email,
      token: rawToken,
      name,
    });

    return NextResponse.json(
      {
        message: "Verification email sent.",
        type: "new",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}