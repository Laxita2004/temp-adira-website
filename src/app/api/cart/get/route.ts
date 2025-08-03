import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API fetches all cart items for a user using their userId.
// PATH: GET /api/cart/get?userId=${userId}
export const GET = async (req: Request) => {
  try {
    // Extract userId from URL query parameters
    const { searchParams } = new URL(req.url);
    const cartId = Number(searchParams.get("cartId"));

    // Validate userId
    if (isNaN(cartId)) {
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    // Fetch cart items for the user, including related product details
    const cart = await prisma.cartItem.findMany({
      where: { cartId },
      include: { product: true },
    });

    return NextResponse.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
