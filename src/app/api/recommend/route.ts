import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json({ error: "Missing title parameter" }, { status: 400 });
  }

  try {
    // 👇 call your local FastAPI endpoint
    const response = await fetch(`http://127.0.0.1:8000/recommend?title=${encodeURIComponent(title)}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error calling recommender:", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}