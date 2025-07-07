import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API allows a user to fetch the current status of their order using the order ID.
// PATH: GET //api/user/track?orderId=${orderId}
export const GET = async (req: Request) => {
  try {
    // Extract orderId from the request's query parameters
    const { searchParams } = new URL(req.url);
    const orderId = Number(searchParams.get("orderId"));

    // Validate orderId
    if (isNaN(orderId)) {
      return NextResponse.json({ error: "Invalid orderId" }, { status: 400 });
    }

    // Fetch the order by ID
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    // Handle case where no order is found
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Return the order status (e.g., "PENDING", "SHIPPED", etc.) and related info
    return NextResponse.json({
      status: order.status,
      updatedAt: order.updatedAt,
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
