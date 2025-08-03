import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API allows a user to add a testimonial/review for a product they've purchased
// PATH: POST /api/user/testimonial
export const POST = async (req: Request) => {
  try {
    const { userEmail, productId, review } = await req.json();

    if (!userEmail || !productId || !review) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        userEmail,
        productId,
        review,
      },
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
