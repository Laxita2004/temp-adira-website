import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireRole, ApiError } from "@/lib/auth";
import { Role } from "@prisma/client";

/**
 * GET /api/patterns
 *
 * Fetch all patterns
 *
 * Access: Public
 *
 * Returns:
 * - 200 → list of patterns
 * - 500 → server error
 */
export const GET = async () => {
  try {

    // Fetch patterns (sorted for consistency)
    const patterns = await prisma.pattern.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(patterns);

  } catch (error) {

    console.error("Failed to fetch patterns:", error);

    return NextResponse.json(
      { error: "Failed to fetch patterns" },
      { status: 500 }
    );
  }
};


/**
 * POST /api/patterns
 *
 * Create a new pattern
 *
 * Access: Admin only
 *
 * Body:
 * - name (string)
 * - imageUrl (string)
 *
 * Returns:
 * - 201 → pattern created
 * - 400 → invalid input
 * - 401 → not authenticated
 * - 403 → not authorized
 * - 500 → server error
 */
export const POST = async (req: Request) => {
  try {

    // Authorization (Admin only)
    await requireRole([Role.ADMIN]);

    const { name, imageUrl } = await req.json();

    // Validation
    if (
      !name ||
      typeof name !== "string" ||
      !imageUrl ||
      typeof imageUrl !== "string"
    ) {
      throw new ApiError("Pattern name and image URL are required", 400);
    }

    // Normalize input
    const normalizedName = name.trim().toLowerCase();
    const normalizedImageUrl = imageUrl.trim();

    if (!normalizedName || !normalizedImageUrl) {
      throw new ApiError("Fields cannot be empty", 400);
    }

    // Duplicate check
    const existingPattern = await prisma.pattern.findUnique({
      where: { name: normalizedName },
    });

    if (existingPattern) {
      throw new ApiError("Pattern already exists", 400);
    }

    // Create pattern
    const newPattern = await prisma.pattern.create({
      data: {
        name: normalizedName,
        imageUrl: normalizedImageUrl,
      },
    });

    return NextResponse.json(newPattern, { status: 201 });

  } catch (error: any) {

    // Handle known errors
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    // Unexpected errors
    console.error("Failed to add pattern:", error);

    return NextResponse.json(
      { error: "Failed to add pattern" },
      { status: 500 }
    );
  }
};