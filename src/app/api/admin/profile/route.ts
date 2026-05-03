import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

// PATCH /api/admin/profile
export const PATCH = async (req: Request) => {
  try {
    // Protect route
    const user = await requireRole([Role.ADMIN]);
    if (user instanceof NextResponse) return user;

    const { name, newEmail, password } = await req.json();

    // Prepare update data safely
    const updateData: any = {};

    if (name) updateData.name = name;
    if (newEmail) updateData.email = newEmail;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10); 
    }

    const admin = await prisma.user.update({
      where: { email: user.email }, 
      data: updateData,
    });

    return NextResponse.json({
      message: "Admin info updated",
      admin,
    });
  } catch (err) {
    console.error("Error updating admin info:", err);
    return NextResponse.json(
      { error: "Something went wrong while updating admin info" },
      { status: 500 }
    );
  }
};