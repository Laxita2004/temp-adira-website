import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API allows a user to fetch the current status of their order using the order ID.
// PATH: GET //api/user/track?orderId=${orderId}
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = Number(searchParams.get("orderId"));

    if (isNaN(orderId)) {
      return NextResponse.json({ error: "Invalid orderId" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true, // <-- This is required to access `order.items.length`
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: order.status,
      updatedAt: order.createdAt,
      orderSummary: {
        total: order.total,
        itemCount: order.items.length,
      },
    });
  } catch (err) {
    console.error("Error tracking order:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};