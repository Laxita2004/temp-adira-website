import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { requireRole, ApiError } from "@/lib/auth";
import { Role, Prisma } from "@prisma/client";

/**
 * GET /api/products
 *
 * Public endpoint to fetch products.
 *
 * If query parameters are provided, products are filtered accordingly.
 * If no query parameters are provided, all products are returned.
 *
 * Supported query parameters:
 * - tag=Festive
 * - category=Kurta
 * - pattern=Floral
 * - material=Cotton
 * - theme=Wedding
 * - minPrice=500
 * - maxPrice=3000
 * - sort=lowToHigh | highToLow | newest
 * - limit=12
 * - offerId=2
 *
 * Examples:
 * - /api/products
 * - /api/products?category=Kurta
 * - /api/products?category=Kurta&material=Cotton
 * - /api/products?theme=Festive&sort=lowToHigh
 * - /api/products?offerId=2
 */
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);

    // Extract query parameters
    const tag = searchParams.get("tag");
    const category = searchParams.get("category");
    const pattern = searchParams.get("pattern");
    const material = searchParams.get("material");
    const theme = searchParams.get("theme");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort");
    const limit = searchParams.get("limit");
    const offerId = searchParams.get("offerId");

    // Sorting configuration
    const orderBy =
      sort === "lowToHigh"
        ? { price: "asc" as const }
        : sort === "highToLow"
          ? { price: "desc" as const }
          : sort === "newest"
            ? { createdAt: "desc" as const }
            : { createdAt: "desc" as const };

    // Build dynamic filters with proper Prisma typing
    const filters: Prisma.ProductWhereInput[] = [
      // Filter by tag (Product.tags is String[])
      ...(tag ? [{ tags: { has: tag } }] : []),

      // Filter by Category.name
      ...(category
        ? [
            {
              category: {
                is: {
                  name: {
                    equals: category,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              },
            },
          ]
        : []),

      // Filter by Pattern.name
      ...(pattern
        ? [
            {
              pattern: {
                is: {
                  name: {
                    equals: pattern,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              },
            },
          ]
        : []),

      // Filter by Material.name
      ...(material
        ? [
            {
              material: {
                is: {
                  name: {
                    equals: material,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              },
            },
          ]
        : []),

      // Filter by Theme.name
      ...(theme
        ? [
            {
              theme: {
                is: {
                  name: {
                    equals: theme,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              },
            },
          ]
        : []),

      // Minimum price
      ...(minPrice
        ? [
            {
              price: {
                gte: Number(minPrice),
              },
            },
          ]
        : []),

      // Maximum price
      ...(maxPrice
        ? [
            {
              price: {
                lte: Number(maxPrice),
              },
            },
          ]
        : []),

      // Filter products belonging to a specific offer
      ...(offerId
        ? [
            {
              offerProducts: {
                some: {
                  offerId: Number(offerId),
                },
              },
            },
          ]
        : []),
    ];

    // Fetch products
    const products = await prisma.product.findMany({
      where: {
        AND: filters,
      },

      orderBy,

      take: limit ? Number(limit) : undefined,

      include: {
        images: true,
        category: true,
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
    });

    // Return products (filtered or all)
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

/**
 * POST /api/products
 *
 * Create a new product
 *
 * Access: Admin only
 *
 * Expected Body:
 * - title, description, price, inStock
 * - categoryId, materialId, patternId, themeId
 * - tags (array of strings)
 * - imageUrls (array of strings)
 *
 * Returns:
 * - 201 → product created
 * - 400 → invalid input
 * - 401 → not authenticated
 * - 403 → not authorized
 * - 500 → server error
 */
export const POST = async (req: NextRequest) => {
  try {
    // Authorization (Admin only)
    await requireRole([Role.ADMIN]);

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

    // Validate required fields
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
      throw new ApiError("Missing or invalid fields", 400);
    }

    // Create product in database
    const newProduct = await prisma.product.create({
      data: {
        title,
        tags,
        description,
        price,
        inStock,

        // Relations
        category: { connect: { id: categoryId } },
        material: { connect: { id: materialId } },
        pattern: { connect: { id: patternId } },
        theme: { connect: { id: themeId } },

        // Create related images
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

    // Return created product
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    // Handle known errors (auth, validation, etc.)
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    // Handle unexpected errors
    console.error("❌ Failed to create product:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
