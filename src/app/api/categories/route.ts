import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/categories
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
};

// POST api/categories
export const POST = async (req: Request) => {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Category name required" }, { status: 400 });
    }

    const newCategory = await prisma.category.create({
      data: { name: name.toLowerCase() },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
  }
};