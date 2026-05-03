import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireRole, ApiError } from "@/lib/auth";
import { Role } from "@prisma/client";

/**
 * GET /api/materials
 *
 * Fetch all materials
 *
 * Access: Public
 *
 * Returns:
 * - 200 → list of materials
 * - 500 → server error
 */
export const GET = async () => {
  try {

    // Fetch materials (sorted for better UX)
    const materials = await prisma.material.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(materials);

  } catch (error) {

    console.error("Failed to fetch materials:", error);

    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500 }
    );
  }
};


/**
 * POST /api/materials
 *
 * Create a new material
 *
 * Access: Admin only
 *
 * Body:
 * - name (string)
 *
 * Returns:
 * - 201 → material created
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
      throw new ApiError("Material name required", 400);
    }

    // Normalize input
    const normalizedName = name.trim().toLowerCase();

    if (!normalizedName) {
      throw new ApiError("Material name cannot be empty", 400);
    }

    // Check duplicate
    const existingMaterial = await prisma.material.findUnique({
      where: { name: normalizedName },
    });

    if (existingMaterial) {
      throw new ApiError("Material already exists", 400);
    }

    // Create material
    const newMaterial = await prisma.material.create({
      data: { name: normalizedName },
    });

    return NextResponse.json(newMaterial, { status: 201 });

  } catch (error: any) {

    // Handle known errors
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    // Unexpected errors
    console.error("Failed to add material:", error);

    return NextResponse.json(
      { error: "Failed to add material" },
      { status: 500 }
    );
  }
};