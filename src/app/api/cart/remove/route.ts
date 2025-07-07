import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API removes a product from a user's cart using userId and productId
// PATH:  /api/cart/remove
export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const { userId, productId } = await req.json();

    // Validate input
    if (!userId || !productId) {
      return NextResponse.json(
        { error: "Missing userId or productId" },
        { status: 400 }
      );
    }

    // Delete the cart item matching both userId and productId
    await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
