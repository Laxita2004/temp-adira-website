"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import FilterChip from "@/components/FilterChip";
import FilterModal from "@/components/FilterModal";

const AllSection = ({ defaultCategory }: { defaultCategory?: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [availableThemes, setAvailableThemes] = useState<string[]>([]);
  const [availableMaterials, setAvailableMaterials] = useState<string[]>([]);
  const [availablePatterns, setAvailablePatterns] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const category = searchParams.get("category") || defaultCategory || "";
  const tag = searchParams.get("tag");
  const pattern = searchParams.get("pattern");
  const material = searchParams.get("material");
  const theme = searchParams.get("theme");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort");

  // fetch filters
  useEffect(() => {
      const fetchFilters = async () => {
      const res = await fetch("/api/products/filters");
      const data = await res.json();
      setAvailablePatterns(data.patterns || []);
      setAvailableMaterials(data.materials || []);
      setAvailableThemes(data.themes || []);
      setAvailableCategories(data.categories || []);
    };
    fetchFilters();
  }, []);

  // fetch products
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

        const res = await fetch(`/api/products/filter?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
        setError("");
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, tag, pattern, material, minPrice, maxPrice, sort]);

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
          <FilterChip
            paramKey="minPrice"
            paramValue={`${minPrice || "0"}–${maxPrice || "∞"}`}
            label={`₹${minPrice || 0}–₹${maxPrice || "∞"}`}
          />
        )}
        {sort && (
          <FilterChip
            paramKey="sort"
            paramValue={sort}
            label={
              sort === "lowToHigh" ? "Price: Low to High" : "Price: High to Low"
            }
          />
        )}
      </div>

      {/* Filter & Sort Options */}
      <div className="flex justify-between items-center mb-8 text-sm text-gray-600">
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="underline underline-offset-4"
          >
            More Filters
          </button>
        </div>
        <div>Recommended</div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableCategories={availableCategories}
        availableMaterials={availableMaterials}
        availablePatterns={availablePatterns}
        availableThemes={availableThemes}
      />

      {/* Product Grid */}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found with selected filters.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm group relative"
            >
              {product.tags?.includes("new arrival") && (
                <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                  New Arrival
                </span>
              )}
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-medium capitalize">
                  {product.name}
                </h3>
                <div className="mt-2 text-sm">
                  <span className="font-bold">₹{product.price}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex justify-center items-center">
                <div className="flex flex-col gap-2">
                  <Link href={`/shop/product/${product.id}`}>
                    <button className="bg-white text-primary px-3 py-1 text-xs font-large rounded-full flex items-center gap-2 justify-center hover:bg-primary hover:text-white transition">
                      <FaEye className="text-lg" /> View Product
                    </button>
                  </Link>
                  <button className="bg-white text-primary px-3 py-1 text-xs font-large rounded-full flex items-center gap-2 justify-center hover:bg-primary hover:text-white transition">
                    <FaShoppingCart className="text-lg" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllSection;
