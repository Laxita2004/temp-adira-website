// import { Metadata } from "next";
import AllSection from "@/components/shop/AllSection";

export default function CategoryPage({ params }) {
  const category = params.category;
  return <AllSection defaultCategory={category} />;
}
