import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API removes a product from a user's cart using userId and productId
// PATH:  /api/cart/remove
export const POST = async (req: Request) => {
  try {
    const { cartId, productId } = await req.json();

    if (!cartId || !productId) {
      return NextResponse.json(
        { error: "Missing cartId or productId" },
        { status: 400 }
      );
    }

    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId,
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
