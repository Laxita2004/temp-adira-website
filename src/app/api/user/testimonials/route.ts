import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API allows a user to add a testimonial/review for a product they've purchased
// PATH: POST /api/user/testimonial
export const POST = async (req: Request) => {
  try {
    const { userId, productId, review } = await req.json();

    const testimonial = await prisma.testimonial.create({
      data: { userId, productId, review },
    });

    return NextResponse.json(testimonial);
  } catch (err) {
    console.error("Error adding testimonial:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
