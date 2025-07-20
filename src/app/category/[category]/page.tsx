import AllSection from "@/components/shop/AllSection";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category;

  return <AllSection defaultCategory={category} />;
}