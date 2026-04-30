import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"; 

export async function GET() {
  try {
    const categories = await prisma.product.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    const uniqueCategories = categories.map((item) => item.category);
    return NextResponse.json(uniqueCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
