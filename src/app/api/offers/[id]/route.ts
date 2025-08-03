import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/offers/[id]
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const saleId = Number(context.params.id);
    if (isNaN(saleId)) {
      return NextResponse.json({ error: "Invalid sale ID" }, { status: 400 });
    }

    const offer = await prisma.offer.findUnique({
      where: { id: saleId },
    });

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json(offer);
  } catch (error) {
    console.error("Error fetching offer:", error);
    return NextResponse.json({ error: "Failed to fetch offer" }, { status: 500 });
  }
}

// Edit Sale
// PATCH /api/offers/[id]
export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    const saleId = Number(context.params.id);
    if (isNaN(saleId)) {
      return NextResponse.json({ error: "Invalid sale ID" }, { status: 400 });
    }

    const body = await req.json();
    const { title, description, bannerUrl, startsAt, endsAt } = body;

    const updatedSale = await prisma.offer.update({
      where: { id: saleId },
      data: {
        title,
        description,
        bannerUrl,
        startsAt: startsAt ? new Date(startsAt) : undefined,
        endsAt: endsAt ? new Date(endsAt) : undefined,
      },
    });

    return NextResponse.json(updatedSale);
  } catch (error) {
    console.error("Error updating sale:", error);
    return NextResponse.json({ error: "Failed to update sale" }, { status: 500 });
  }
}


// Delete Sale
// DELETE /api/offers/[id]
export async function DELETE(_: Request, context: { params: { id: string } }) {
    try {
        const saleId = Number(context.params.id)
    const deletedSale = await prisma.offer.delete({
      where: { id: saleId },
    });

    return NextResponse.json(deletedSale);
  } catch (error) {
    console.error("Error deleting sale:", error);
    return NextResponse.json({ error: "Failed to delete sale" }, { status: 500 });
  }
}