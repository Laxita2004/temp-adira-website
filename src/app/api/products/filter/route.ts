import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    const sort = searchParams.get("sort"); // "lowToHigh", "highToLow", "newest"
    const limit = searchParams.get("limit");
    const offerId = searchParams.get("offerId");

    const orderBy: Record<string, "asc" | "desc"> | undefined =
      sort === "lowToHigh"
        ? { price: "asc" }
        : sort === "highToLow"
        ? { price: "desc" }
        : sort === "newest"
        ? { createdAt: "desc" }
        : undefined;

    let products;

    // ✅ Case 1: If offerId is present → fetch products via offerProducts
    if (offerId) {
      const offer = await prisma.offer.findUnique({
        where: { id: parseInt(offerId) },
        include: {
          offerProducts: {
            include: {
              product: {
                include: {
                  images: true,
                  pattern: true,
                  material: true,
                  theme: true,
                },
              },
            },
          },
        },
      });

      if (!offer) {
        return NextResponse.json({ error: "Offer not found" }, { status: 404 });
      }

      // Apply filters to products inside offer
      products = offer.offerProducts
        .map((op) => op.product)
        .filter((product) => {
          return (
            (!tag || product.tags.includes(tag)) &&
            (!category ||
              product.category.toLowerCase() === category.toLowerCase()) &&
            (!pattern ||
              product.pattern.name.toLowerCase() === pattern.toLowerCase()) &&
            (!material ||
              product.material.name.toLowerCase() === material.toLowerCase()) &&
            (!themes ||
              product.theme.name.toLowerCase() === themes.toLowerCase()) &&
            (!minPrice ||
              parseFloat(product.price.toString()) >= parseFloat(minPrice)) &&
            (!maxPrice ||
              parseFloat(product.price.toString()) <= parseFloat(maxPrice))
          );
        });

      // Sort manually since it's an array now
      if (orderBy) {
        const key = Object.keys(orderBy)[0] as "price" | "createdAt";
        const direction = orderBy[key];

        products.sort((a, b) => {
          const valA = parseFloat(a[key].toString());
          const valB = parseFloat(b[key].toString());
          return direction === "asc" ? valA - valB : valB - valA;
        });
      }

      // Apply limit if needed
      if (limit) {
        products = products.slice(0, parseInt(limit));
      }
    } else {
      // ✅ Case 2: Normal query (no offerId)
      products = await prisma.product.findMany({
        where: {
          AND: [
            tag ? { tags: { has: tag } } : {},
            category ? { category: category.toLowerCase() } : {},
            pattern ? { pattern: { is: { name: pattern.toLowerCase() } } } : {},
            material
              ? { material: { is: { name: material.toLowerCase() } } }
              : {},
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
    }

    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Something went wrong while fetching products" },
      { status: 500 }
    );
  }
};
