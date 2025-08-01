import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Fetch list of all sales
// GET api/offers
export async function GET() {
  try {
    const sales = await prisma.offer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, sales });
  } catch (error) {
    console.error("Error fetching sales:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch sales." },
      { status: 500 }
    );
  }
}

// Create a Sale
// POST /api/admin/offers
export async function POST(req: Request) {
    try {
    const {
      title,
      bannerUrl,
      discountType,
      discountValue,
      startsAt,
      endsAt,
      productIds,
      description,
    } = await req.json();

    const newOffer = await prisma.offer.create({
      data: {
        title,
        bannerUrl,
        discountType,
        discountValue,
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt),
        description,
        offerProducts: {
          create: productIds.map((productId: number) => ({
            product: { connect: { id: productId } },
          })),
        },
      },
      include: {
        offerProducts: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json(newOffer);
  } catch (error) {
    console.error("[CREATE_OFFER]", error);
    return new NextResponse("Failed to create offer", { status: 500 });
  }
}

