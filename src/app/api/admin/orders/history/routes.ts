import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// this api fetches all historical orders — either delivered or cancelled.
// GET /api/admin/orders/history
export const GET = async () => {
  try {
    const orderHistory = await prisma.order.findMany({
      where: {
        status: {
          in: ["DELIVERED", "CANCELLED"],
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

    return NextResponse.json(orderHistory);
  } catch (error) {
    console.error("Error fetching order history:", error);
    return NextResponse.json(
      { error: "Failed to fetch order history" },
      { status: 500 }
    );
  }
};