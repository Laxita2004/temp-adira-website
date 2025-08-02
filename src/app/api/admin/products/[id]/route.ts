import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Edit a product
// PUT /api/admin/products/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    } = await request.json();

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

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
        images: {
          deleteMany: {}, // delete all old images
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
}
