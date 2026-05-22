import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireRole, ApiError } from "@/lib/auth";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

/**
 * PATCH /api/admin/profile
 *
 * Update admin profile details
 *
 * Access: Admin only
 *
 * Body:
 * - name? (string)
 * - newEmail? (string)
 * - password? (string)
 *
 * Returns:
 * - 200 → updated admin
 * - 400 → invalid input
 * - 401 → not authenticated
 * - 403 → not authorized
 * - 500 → server error
 */
export const PATCH = async (req: Request) => {
  try {

    // Authorization (Admin only)
    const user = await requireRole([Role.ADMIN]);

    const { name, newEmail, password } = await req.json();

    // Nothing to update
    if (!name && !newEmail && !password) {
      throw new ApiError("No fields provided to update", 400);
    }

    // Prepare update data safely
    const updateData: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    // Update name
    if (name) {
      updateData.name = name;
    }

    // Update email (check uniqueness)
    if (newEmail) {
      const existingUser = await prisma.user.findUnique({
        where: { email: newEmail },
      });

      if (existingUser && existingUser.email !== user.email) {
        throw new ApiError("Email already in use", 400);
      }

      updateData.email = newEmail;
    }

    // Hash password before saving
    if (password) {
      if (password.length < 6) {
        throw new ApiError("Password must be at least 6 characters", 400);
      }

      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update admin in DB
    const updatedAdmin = await prisma.user.update({
      where: { email: user.email },
      data: updateData,
    });

    // Success response
    return NextResponse.json({
      message: "Admin info updated",
      admin: updatedAdmin,
    });

  } catch (error: any) {

    // Handle known errors
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    // Unexpected errors
    console.error("Error updating admin info:", error);

    return NextResponse.json(
      { error: "Something went wrong while updating admin info" },
      { status: 500 }
    );
  }
};