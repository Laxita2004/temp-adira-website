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
            },
        });

        return NextResponse.json(sarees);
    } catch (err) {
        console.error("Error fetching sarees:", err);
        return NextResponse.json(
            { error: "Something went wrong while fetching sarees" },
            { status : 500 }
        );
    }
};
