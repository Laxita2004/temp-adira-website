import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This api is for admin to update her profile
// PATCH /api/admin/profile
export const PATCH = async (req: Request) => {
  try {
    const { email, name, newEmail, password } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Admin email is required to update profile" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.update({
      where: { email },
      data: {
        name,
        email: newEmail || email,
        password,
      },
    });

    return NextResponse.json({ message: "Admin info updated", admin });
  } catch (err) {
    console.error("Error updating admin info:", err);
    return NextResponse.json(
      { error: "Something went wrong while updating admin info" },
      { status: 500 }
    );
  }
};
