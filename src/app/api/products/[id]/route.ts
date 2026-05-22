import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireRole, ApiError } from "@/lib/auth";
import { Role } from "@prisma/client";

/**
 * GET /api/products/[id]
 *
 * Fetch a single product by ID
 *
 * Access: Public
 *
 * Returns:
 * - 200 → product data
 * - 400 → invalid ID
 * - 404 → product not found
 * - 500 → server error
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    
    // Extract and validate product ID
    const { id } = await context.params;
    const productId = Number(id);

    if (isNaN(productId)) {
      throw new ApiError("Invalid product ID", 400);
    }

    // Fetch product from database
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        category: true,
        material: true,
        pattern: true,
        theme: true,
      },
    });

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    // Return product
    return NextResponse.json(product);

  } catch (error: any) {

    // Handle known errors
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    // Handle unexpected errors
    console.error("Error fetching product:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[id]
 *
 * Updates an existing product.
 *
 * Access: Admin only
 *
 * Expected:
 * - URL param: id (product ID)
 * - Body: product fields to update
 *
 * Returns:
 * - 200 → updated product
 * - 400 → invalid input
 * - 401 → not authenticated
 * - 403 → not authorized (not admin)
 * - 404 → product not found
 * - 500 → server error
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    
    // Authorization
    await requireRole([Role.ADMIN]);

    const { id } = await context.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      throw new ApiError("Invalid product ID", 400);
    }

    
    // Parse request body
    const body = await request.json();

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
    }: {
      title: string;
      tags: string[];
      description: string;
      price: number;
      inStock: number;
      categoryId: number;
      materialId: number;
      patternId: number;
      themeId: number;
      imageUrls: string[];
    } = body;

    // Validate required fields
    if (
      !title ||
      !price ||
      !categoryId ||
      !materialId ||
      !patternId ||
      !themeId ||
      typeof inStock !== "number"
    ) {
      throw new ApiError("Missing or invalid fields", 400);
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new ApiError("Product not found", 404);
    }

    // Update product in database
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
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

        updatedAt: new Date(),

        // Replace all existing images with new ones
        images: {
          deleteMany: {},
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

    return NextResponse.json(updatedProduct);

  } catch (error: any) {

    //Handle known errors (business logic errors)
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    // Handle unexpected errors (server issues)
    
    console.error("Failed to update product:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


/**
 * DELETE /api/products/[id]
 *
 * Delete a product by ID
 *
 * Access: Admin only
 *
 * Returns:
 * - 200 → deletion success
 * - 400 → invalid ID
 * - 401 → not authenticated
 * - 403 → not authorized
 * - 500 → server error
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {

    // Authorization (Admin only)
    await requireRole([Role.ADMIN]);

    // Extract and validate product ID
    const { id } = await context.params;
    const productId = Number(id);

    if (isNaN(productId)) {
      throw new ApiError("Invalid product ID", 400);
    }

    // Delete product
    await prisma.product.delete({
      where: { id: productId },
    });

    // Return success response
    return NextResponse.json({ success: true });

  } catch (error: any) {

    // Handle known errors
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    // Handle unexpected errors
    console.error("Error deleting product:", error);

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}