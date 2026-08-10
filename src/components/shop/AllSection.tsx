"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaEye } from "react-icons/fa";
import FilterChip from "@/components/FilterChip";
import FilterModal from "@/components/FilterModal";

interface ProductImage {
  id: number;
  url: string;
}

interface Product {
  id: number;
  title: string;
  price: string | number;
  tags: string[];
  images: ProductImage[];
}

const AllSection = () => {
  const searchParams = useSearchParams();

  // Product state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Active filters from URL
  const category = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";
  const pattern = searchParams.get("pattern") || "";
  const material = searchParams.get("material") || "";
  const theme = searchParams.get("theme") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "";
  const offerId = searchParams.get("offerId") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (category) params.set("category", category);
        if (tag) params.set("tag", tag);
        if (pattern) params.set("pattern", pattern);
        if (material) params.set("material", material);
        if (theme) params.set("theme", theme);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (sort) params.set("sort", sort);
        if (offerId) params.set("offerId", offerId);

        const query = params.toString();

        const url = query ? `/api/products?${query}` : "/api/products";

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await res.json();

        setProducts(data);
        setError("");
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    category,
    tag,
    pattern,
    material,
    theme,
    minPrice,
    maxPrice,
    sort,
    offerId,
  ]);

  return (
    <section className="px-4 md:px-10 py-16 bg-light">
      {/* Applied Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {category && <FilterChip paramKey="category" paramValue={category} />}

        {pattern && <FilterChip paramKey="pattern" paramValue={pattern} />}

        {material && <FilterChip paramKey="material" paramValue={material} />}

        {theme && <FilterChip paramKey="theme" paramValue={theme} />}

        {tag && <FilterChip paramKey="tag" paramValue={tag} />}

        {(minPrice || maxPrice) && (
          <Suspense fallback={<div>Loading...</div>}>
            <FilterChip
              paramKey="minPrice"
              paramValue={`${minPrice || "0"}-${maxPrice || "∞"}`}
              label={`₹${minPrice || 0} - ₹${maxPrice || "∞"}`}
            />
          </Suspense>
        )}

        {sort && (
          <Suspense fallback={<div>Loading...</div>}>
            <FilterChip
              paramKey="sort"
              paramValue={sort}
              label={
                sort === "lowToHigh"
                  ? "Price: Low to High"
                  : sort === "highToLow"
                    ? "Price: High to Low"
                    : "Newest"
              }
            />
          </Suspense>
        )}
      </div>

      {/* Filter Button */}
      <div className="flex justify-between items-center mb-8 text-sm text-gray-600">
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="underline underline-offset-4"
          >
            More Filters
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      <Suspense fallback={<div>Loading...</div>}>
        <FilterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Suspense>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500"> Loading products... </p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-red-500"> {error} </p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">
            No products found with selected filters.{" "}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/product/${product.id}`}
              className="bg-white border rounded-xl overflow-hidden shadow-sm group relative block"
            >
              {product.tags?.includes("new arrival") && (
                <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                  New Arrival
                </span>
              )}

              <img
                src={product.images?.[0]?.url || "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-4 mt-2">
                <h3 className="text-lg bg-yellow text-primary font-bold capitalize">
                  {product.title}
                </h3>

                <div className="mt-2 text-sm">
                  <span className="text-secondary font-bold">₹{Number(product.price)}</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex justify-center items-center">
                <div className="flex flex-col gap-2">
                  <button className="bg-white text-primary px-3 py-1 text-xs rounded-full flex items-center gap-2 justify-center hover:bg-primary hover:text-white transition">
                    <FaEye className="text-lg" />
                    View Product
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllSection;
