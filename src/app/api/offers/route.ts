import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import {  } from "";

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
    const body = await req.json();
    const { name, description, bannerUrl, startsAt, endsAt } = body;

    const newSale = await prisma.offer.create({
      data: {
        name,
        description,
        bannerUrl,
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt),
      },
    });

    return NextResponse.json(newSale, { status: 201 });
  } catch (error) {
    console.error("Error creating sale:", error);
    return NextResponse.json({ error: "Failed to create sale" }, { status: 500 });
  }
}

// Edit Sale
// PATCH /api/admin/offers/[id]
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
    const saleId = params.id;
    const body = await req.json();
    const { name, description, bannerUrl, startsAt, endsAt } = body;

    const updatedSale = await prisma.offer.update({
      where: { id: saleId },
      data: {
        name,
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
// DELETE /api/admin/offers/[id]
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
    const deletedSale = await prisma.offer.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedSale);
  } catch (error) {
    console.error("Error deleting sale:", error);
    return NextResponse.json({ error: "Failed to delete sale" }, { status: 500 });
  }
}