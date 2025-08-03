import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API fetches all past orders of a user by userId
// PATH: GET /api/orders/user?userId=7
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Missing user email" },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userEmail: email,
      },
      include: {
        items: {
          include: {
            product: true, // optional: include product details in order items
          },
        },
        payment: true, // optional: include payment info
      },
      orderBy: {
        createdAt: "desc",
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