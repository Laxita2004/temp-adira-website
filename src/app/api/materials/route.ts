import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/materials
export const GET = async () => {
  try {
    const materials = await prisma.material.findMany();
    return NextResponse.json(materials);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch materials" }, { status: 500 });
  }
};

// POST api/materials
export const POST = async (req: Request) => {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Material name required" }, { status: 400 });
    }

    const newMaterial = await prisma.material.create({
      data: { name: name.toLowerCase() },
    });

    return NextResponse.json(newMaterial);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add material" }, { status: 500 });
  }
};