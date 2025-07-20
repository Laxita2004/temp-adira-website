import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API fetches all products where category is 'SAREE'
// PATH: GET /api/products/sarees
export const GET = async () => {
  try {
    const sarees = await prisma.product.findMany({
      where: {
        category: "saree",
      },
      include: {
        images: true,
        material: true,
        pattern: true,
        theme: true,
      },
    });

    // ✅ Handle null (shouldn’t happen unless query fails internally)
    if (!sarees) {
      return NextResponse.json({ sarees: [] });
    }

    // ✅ Safe even if sarees = []
    return NextResponse.json(sarees);
  } catch (error: any) {
    console.error("Error fetching sarees:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};
