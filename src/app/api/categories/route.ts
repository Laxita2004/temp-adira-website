import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireRole, ApiError } from "@/lib/auth";
import { Role } from "@prisma/client";

/**
 * GET /api/categories
 *
 * Fetch all categories
 *
 * Access: Public
 *
 * Returns:
 * - 200 → list of categories
 * - 500 → server error
 */
export const GET = async () => {
  try {

    // Fetch all categories
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(categories);

  } catch (error) {

    console.error("Failed to fetch categories:", error);

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
};


/**
 * POST /api/categories
 *
 * Create a new category
 *
 * Access: Admin only
 *
 * Body:
 * - name (string)
 *
 * Returns:
 * - 201 → category created
 * - 400 → invalid input
 * - 401 → not authenticated
 * - 403 → not authorized
 * - 500 → server error
 */
export const POST = async (req: Request) => {
  try {

    // Authorization (Admin only)
    await requireRole([Role.ADMIN]);

    const { name } = await req.json();

    // Validation
    if (!name || typeof name !== "string") {
      throw new ApiError("Category name required", 400);
    }

    // Normalize input
    const normalizedName = name.trim().toLowerCase();

    if (!normalizedName) {
      throw new ApiError("Category name cannot be empty", 400);
    }

    // Check for duplicate category
    const existingCategory = await prisma.category.findUnique({
      where: { name: normalizedName },
    });

    if (existingCategory) {
      throw new ApiError("Category already exists", 400);
    }

    // Create category
    const newCategory = await prisma.category.create({
      data: { name: normalizedName },
    });

    // Success response
    return NextResponse.json(newCategory, { status: 201 });

  } catch (error: any) {

    // Handle known errors
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    // Unexpected errors
    console.error("Failed to add category:", error);

    return NextResponse.json(
      { error: "Failed to add category" },
      { status: 500 }
    );
  }
};