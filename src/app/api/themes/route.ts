import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET api/themes
export const GET = async () => {
  try {
    const themes = await prisma.theme.findMany();
    return NextResponse.json(themes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch themes" }, { status: 500 });
  }
};

// POST api/themes
export const POST = async (req: Request) => {
  try {
    const { name, imageUrl } = await req.json();

    if (!name || !imageUrl) {
      return NextResponse.json({ error: "Theme name and URL required" }, { status: 400 });
    }

    const newTheme = await prisma.theme.create({
      data: { 
        name: name.toLowerCase(),
        imageUrl,
      },
    });

    return NextResponse.json(newTheme);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add theme" }, { status: 500 });
  }
};