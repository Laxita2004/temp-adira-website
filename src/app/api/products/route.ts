import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { Role } from "@prisma/client";

// Fetch all products (admin view)
// PATH: GET /api/products
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
      { status: 500 },
    );
  }
};

// Add new product
// PATH: POST api/products
export const POST = async (req: NextRequest) => {
  try {
    // Protect route
    const user = await requireRole([Role.ADMIN]);
    if (user instanceof NextResponse) return user;
    const body = await req.json();

    const {
      title,
      tags,
      description,
      price,
      inStock,
      categoryId,
      materialId,
      patternId,
      themeId,
      imageUrls,
    } = body;

    if (
      !title ||
      !price ||
      !categoryId ||
      !materialId ||
      !patternId ||
      !themeId ||
      typeof inStock !== "number" ||
      !Array.isArray(imageUrls)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 },
      );
    }

    // Create product
    const newProduct = await prisma.product.create({
      data: {
        title,
        tags,
        description,
        price,
        inStock,
        category: { connect: { id: categoryId } },
        material: { connect: { id: materialId } },
        pattern: { connect: { id: patternId } },
        theme: { connect: { id: themeId } },
        images: {
          create: imageUrls.map((url: string) => ({ url })),
        },
      },
      include: {
        images: true,
        category: true,
        material: true,
        pattern: true,
        theme: true,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to create product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
