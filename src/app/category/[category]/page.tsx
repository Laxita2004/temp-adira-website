import { Metadata } from "next";
import AllSection from "@/components/shop/AllSection";

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category;
  return <AllSection defaultCategory={category} />;
}
