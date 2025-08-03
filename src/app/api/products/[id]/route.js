import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API fetches a specific product by its ID, including its images.
// PATH: GET /api/products/${productId}
export async function GET(
  request,
  context
) {
  try {
    const productId = Number(context.params.id);
    console.log("Product ID:", productId);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
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
export const DELETE = async (
  request, context
) => {
  try {
    const productId = Number(context.params.id);

    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting product:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
};