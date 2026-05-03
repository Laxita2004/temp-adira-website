import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { Role } from "@prisma/client";

// GET /api/products/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = (await context.params) as { id: string }; 

    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole([Role.ADMIN]);
    if (user instanceof NextResponse) return user;
    const { id } = (await context.params) as { id: string }; // ✅ FIX

    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting product:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}