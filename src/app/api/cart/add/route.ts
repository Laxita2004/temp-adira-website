import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API adds a product to the user's cart.
// If the product already exists in the cart, it increments the quantity.
// PATH: /api/cart/add
export const POST = async (req: Request) => {
  try {
    // Parse data from request body
    const { userId, productId, quantity } = await req.json();

    // Validate input (optional but recommended)
    if (!userId || !productId || !quantity) {
      return NextResponse.json(
        { error: "Missing userId, productId, or quantity" },
        { status: 400 }
      );
    }

    // If the cart item already exists, increment quantity
    // Otherwise, create a new cart item entry
    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        userId,
        productId,
        quantity,
      },
    });

    return NextResponse.json(cartItem);
  } catch (err) {
    console.error("Error adding item to cart:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
