import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API fetches all past orders of a user by userId
// PATH: GET /api/orders/user?userId=7
export const GET = async (req: Request) => {
  try {
    // Extract search params from the request URL
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));

    // Validate userId
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    // Fetch all orders placed by this user, including the items in each order
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
