import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { requireRole, ApiError } from "@/lib/auth";
import { Role } from "@prisma/client";

/**
 * GET /api/products
 *
 * Fetch all products (public endpoint)
 *
 * Access: Public
 *
 * Returns:
 * - 200 → list of products
 * - 500 → server error
 */
export const GET = async () => {
  try {
    
    // Fetch all products with related data
    const products = await prisma.product.findMany({
      include: {
        images: true,
        material: true,
        pattern: true,
        theme: true,
        testimonials: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    
    // Return products    
    return NextResponse.json(products);

  } catch (error) {

    // Handle unexpected errors
    console.error("Failed to fetch products:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};


/**
 * POST /api/products
 *
 * Create a new product
 *
 * Access: Admin only
 *
 * Expected Body:
 * - title, description, price, inStock
 * - categoryId, materialId, patternId, themeId
 * - tags (array of strings)
 * - imageUrls (array of strings)
 *
 * Returns:
 * - 201 → product created
 * - 400 → invalid input
 * - 401 → not authenticated
 * - 403 → not authorized
 * - 500 → server error
 */
export const POST = async (req: NextRequest) => {
  try {

    // Authorization (Admin only)
    await requireRole([Role.ADMIN]);

    const body = await req.json();

    const {
      title,
      tags,
      description,
      price,
      inStock,
      categoryId,
      materialId,
      patternId,
      themeId,
      imageUrls,
    } = body;

    // Validate required fields
    if (
      !title ||
      !price ||
      !categoryId ||
      !materialId ||
      !patternId ||
      !themeId ||
      typeof inStock !== "number" ||
      !Array.isArray(imageUrls)
    ) {
      throw new ApiError("Missing or invalid fields", 400);
    }

    // Create product in database
    const newProduct = await prisma.product.create({
      data: {
        title,
        tags,
        description,
        price,
        inStock,

        // Relations
        category: { connect: { id: categoryId } },
        material: { connect: { id: materialId } },
        pattern: { connect: { id: patternId } },
        theme: { connect: { id: themeId } },

        // Create related images
        images: {
          create: imageUrls.map((url: string) => ({ url })),
        },
      },
      include: {
        images: true,
        category: true,
        material: true,
        pattern: true,
        theme: true,
      },
    });

    // Return created product
    return NextResponse.json(newProduct, { status: 201 });

  } catch (error: any) {

    // Handle known errors (auth, validation, etc.)
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    // Handle unexpected errors
    console.error("❌ Failed to create product:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};