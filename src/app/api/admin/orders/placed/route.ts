import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This api fetches all orders where status is not delivered or cancelled.
// GET /api/admin/orders/placed
export const GET = async () => {
  try {
    const placedOrders = await prisma.order.findMany({
      where: {
        NOT: {
          status: {
            in: ["DELIVERED", "CANCELLED"],
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                title: true,
                price: true,
                images: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
        payment: {
          select: {
            amount: true,
            status: true,
            provider: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(placedOrders);
  } catch (err) {
    console.error("Error fetching placed orders:", err);
    return NextResponse.json(
      { error: "Failed to fetch placed orders" },
      { status: 500 }
    );
  }
};