import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This API fetches products based on a provided tag (e.g., "bestseller", "hand painted", etc.), or category("saree", "poshak")
// PATH: GET /api/products/filter?tag=bestseller&category=poshak
export const GET = async (req: Request) => {
  try {
    const url = req.url || "";
    const { searchParams } = new URL(url);

    const tag = searchParams.get("tag");
    const category = searchParams.get("category");
    const pattern = searchParams.get("pattern");
    const material = searchParams.get("material");
    const themes = searchParams.get("theme");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort"); // sort=newest, lowToHigh, etc.
    const limit = searchParams.get("limit");

    const orderBy:
  | { price: "asc" | "desc" }
  | { createdAt: "asc" | "desc" }
  | undefined =
  sort === "lowToHigh"
    ? { price: "asc" }
    : sort === "highToLow"
    ? { price: "desc" }
    : sort === "newest"
    ? { createdAt: "desc" }
    : undefined;

    const products = await prisma.product.findMany({
      where: {
        AND: [
          tag ? { tags: { has: tag } } : {},
          category ? { category: category.toLowerCase() } : {},
          pattern ? { pattern: { is: { name: pattern.toLowerCase() } } } : {},
          material ? { material: { is: { name: material.toLowerCase() } } } : {},
          themes ? { theme: { is: { name: themes.toLowerCase() } } } : {},
          minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
          maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
        ],
      },
      orderBy,
      take: limit ? parseInt(limit) : undefined,
      include: {
        images: true,
        pattern: true,
        material: true,
        theme: true,
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