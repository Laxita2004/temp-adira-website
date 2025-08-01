import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// edit a product
// PATH: PUT /api/admin/products/${productId}
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const productId = parseInt(params.id);
    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const {
      title,
      tags,
      description,
      price,
      inStock,
      category,
      materialId,
      patternId,
      themeId,
      imageUrls,
    } = await req.json();

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update product data
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        tags,
        description,
        price,
        inStock,
        category,
        material: { connect: { id: materialId } },
        pattern: { connect: { id: patternId } },
        theme: { connect: { id: themeId } },
        updatedAt: new Date(),
        // First delete old images if needed
        images: {
          deleteMany: {}, // delete all current images
          create: imageUrls?.map((url: string) => ({ url })) || [],
        },
      },
      include: {
        images: true,
        material: true,
        pattern: true,
        theme: true,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("❌ Failed to update product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};