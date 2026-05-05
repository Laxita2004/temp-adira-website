import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireRole, ApiError } from "@/lib/auth";
import { Role } from "@prisma/client";

/**
 * GET /api/themes
 *
 * Fetch all themes
 *
 * Access: Public
 *
 * Returns:
 * - 200 → list of themes
 * - 500 → server error
 */
export const GET = async () => {
  try {
    const themes = await prisma.theme.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(themes);

  } catch (error) {
    console.error("Failed to fetch themes:", error);
    console.error("Error Type:", typeof error);
    console.error("Full error:", error);

    return NextResponse.json(
      { error: "Failed to fetch themes" },
      { status: 500 }
    );
  }
};

/**
 * POST /api/themes
 *
 * Create a new theme
 *
 * Access: Admin only
 *
 * Expected Body:
 * - name (string)
 * - imageUrl (string)
 *
 * Returns:
 * - 200 → created theme
 * - 400 → invalid input
 * - 401 → not authenticated
 * - 403 → not authorized
 * - 500 → server error
 */
export const POST = async (req: Request) => {
  try {

    // Admin protection
    await requireRole([Role.ADMIN]);

    const { name, imageUrl } = await req.json();

    // Validation
    if (!name || !imageUrl) {
      throw new ApiError("Theme name and image URL required", 400);
    }

    // Create theme
    const newTheme = await prisma.theme.create({
      data: {
        name: name.toLowerCase(),
        imageUrl,
      },
    });

    return NextResponse.json(newTheme);

  } catch (error: any) {

    // Known errors (auth / validation)
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    // Unknown errors
    console.error("Failed to add theme:", error);

    return NextResponse.json(
      { error: "Failed to add theme" },
      { status: 500 }
    );
  }
};