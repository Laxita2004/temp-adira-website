import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// Fetch all products (admin view) with related images
// PATH: GET /api/products
// Returns JSON array of products
export const GET = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        material: true,
        pattern: true,
        theme: true,
        testimonials: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        colors: {
          include: {
            color: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Add new product
// PATH: POST api/products
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const {
      title,
      tags,
      description,
      price,
      inStock,
      category,
      materialId,
      patternId,
      themeId,
      colorIds,
      imageUrls, // array of image URLs
    } = body;

    if (
      !title || !price || !category ||
      !materialId || !patternId || !themeId ||
      typeof inStock !== "number" || !Array.isArray(imageUrls)
    ) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    // Create product
    const newProduct = await prisma.product.create({
      data: {
        title,
        tags,
        description,
        price,
        inStock,
        category,
        material: { connect: { id: materialId } },
        pattern: { connect: { id: patternId } },
        theme: { connect: { id: themeId } },
        images: {
          create: imageUrls.map((url: string) => ({ url })),
        },
        colors: {
          create: colorIds.map((colorId: number) => ({
            color: { connect: { id: colorId } },
          })),
        }
      },
      include: {
        images: true,
        material: true,
        pattern: true,
        theme: true,
        colors: {
          include: {
            color: true,
          },
        },
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to create product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};