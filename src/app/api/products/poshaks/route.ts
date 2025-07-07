import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetches all products with category = "POSHAK"
// PATH: GET /api/products/poshaks
export const GET = async () => {
    try {
        const poshaks = await prisma.product.findMany({
            where: { category: "POSHAK" },
            include: { 
                images: true 
            },
        });

        return NextResponse.json(poshaks);
    } catch (err) {
        console.error("Error fetching poshaks:", err);
        return NextResponse.json(
            { error: "Failed to fetch poshaks."},
            { status: 500 }
        )
    };
};