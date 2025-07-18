import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// This API fetches a specific product by its ID, including its images.
// PATH: GET /products/${productId}
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const productId = Number(params.id);

    // Validate the product ID
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Fetch the product with its images
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
};

