import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API fetches products based on a provided tag (e.g., "bestseller", "hand painted", etc.)
// PATH: GET /api/products/filter?tag=bestseller
export const GET = async (req: Request) => {
    // parse tag from the query params
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");

    try {
        const products = await prisma.product.findMany({
            where: {
                // 'tags' is assumed to be a String[] in the schema
                tags: {
                    has: tag || undefined,
                },
            },
            include: {
                images: true, // Include product images in the response
            },
        });

        return NextResponse.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        return NextResponse.json(
         { error: "Something went wrong while fetching products" },
         { status: 500 }
        );
    }
};