import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API adds a product to the user's cart.
// If the product already exists in the cart, it increments the quantity.
// PATH: /api/cart/add
export const POST = async (req: Request) => {
  try {
    const { userEmail, productId, quantity } = await req.json();

    if (!userEmail || !productId || !quantity) {
      return NextResponse.json(
        { error: "Missing userEmail, productId, or quantity" },
        { status: 400 }
      );
    }

    // Get the user's cart (assumes one cart per user)
    const cart = await prisma.cart.findUnique({
      where: { userEmail },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Upsert cart item based on cartId + productId
    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        cartId: cart.id,
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
