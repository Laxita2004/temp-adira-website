"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  images: { url: string }[];
};

const NewInSection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/filter?sort=newest&limit=5");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 px-4 " id="new-in-section">
      <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            NEW IN
          </h2>
          <div className="w-16 h-1 mt-2 bg-primary rounded-full"></div>
        </div>
        {/* Optional link/button */}
        <Link
          href="/shop/all?sort=newest"
          className="text-sm text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            href={`/shop/product/${product.id}`}
            key={product.id}
            className="bg-white shadow rounded-xl overflow-hidden block"
          >
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="w-full h-60 object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewInSection;
