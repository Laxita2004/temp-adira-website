"use client";

import React, { useRef, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

const BestSeller: React.FC = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch("/api/products/filter?tag=bestseller");
        const data = await res.json();
        setBestSellers(data);
      } catch (error) {
        console.error("Failed to fetch best sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading)
    return <p className="px-4 py-8 text-gray-600">Loading best sellers...</p>;
  if (bestSellers.length === 0)
    return <p className="px-4 py-8 text-gray-600">No best sellers found.</p>;

  return (
    <div id="best-seller-section" className="relative py-12 px-4">
      <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            Best Sellers
          </h2>
          <div className="w-16 h-1 mt-2 bg-primary rounded-full"></div>
        </div>
        {/* Optional link/button */}
        <button
          className="text-sm text-primary hover:underline"
          onClick={() => router.push("/shop/all?tag=bestseller")}
        >
          View All
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 shadow p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 shadow p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <FaArrowRight />
      </button>

      {/* Scrollable Product Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-4 scroll-smooth scrollbar-hide"
      >
        {bestSellers.map((item) => (
          <div
            key={item.id}
            className="relative min-w-[320px] group rounded-xl overflow-hidden shadow-lg bg-white"
          >
            

            {/* Image */}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-80 object-cover"
            />

            {/* Hover overlay (DESKTOP ONLY) */}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-end p-4">
              <p className="text-white font-semibold text-sm mb-2">
                {item.name}
              </p>
              <button
                onClick={() => router.push(`/shop/product/${item.id}`)}
                className="bg-white text-primary px-3 py-1 text-xs font-medium rounded-full flex items-center gap-2 self-start hover:bg-primary hover:text-white transition"
              >
                View Product
              </button>
            </div>

            {/* Mobile-only bottom info box */}
            <div className="p-4 block md:hidden">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-primary font-semibold text-sm">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
