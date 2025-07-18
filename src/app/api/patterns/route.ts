import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET api/patterns
export const GET = async () => {
  try {
    const patterns = await prisma.pattern.findMany();
    return NextResponse.json(patterns);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch patterns" }, { status: 500 });
  }
};

// POST api/patterns
export const POST = async (req: Request) => {
  try {
    const { name, imageUrl } = await req.json();

    if (!name || !imageUrl) {
      return NextResponse.json({ error: "Pattern name and image URL are required" }, { status: 400 });
    }

    const newPattern = await prisma.pattern.create({
      data: {
        name: name.toLowerCase(),
        imageUrl,
      },
    });

    return NextResponse.json(newPattern);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add pattern" }, { status: 500 });
  }
};
