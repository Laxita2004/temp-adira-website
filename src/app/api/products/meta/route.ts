import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    // Fetch distinct material names
    const materials = await prisma.material.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    });

    // Fetch distinct pattern names
    const patterns = await prisma.pattern.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    });

    const themes = await prisma.theme.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    });

    // Fetch distinct categories from product table
    const categoriesRaw = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
    });

    const categories = categoriesRaw
      .map((c) => c.category.toLowerCase())
      .filter((v, i, arr) => arr.indexOf(v) === i); // Ensure uniqueness (optional)

    return NextResponse.json({
      materials: materials.map((m) => m.name.toLowerCase()),
      patterns: patterns.map((p) => p.name.toLowerCase()),
      themes: themes.map((t) => t.name.toLowerCase()),
      categories,
    });
  } catch (err) {
    console.error("Failed to fetch filter metadata:", err);
    return NextResponse.json(
      { error: "Failed to fetch filter metadata" },
      { status: 500 }
    );
  }
};
