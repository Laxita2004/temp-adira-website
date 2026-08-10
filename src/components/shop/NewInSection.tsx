"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

type Product = {
  id: number;
  title: string;
  price: string | number;
  images: { url: string }[];
};

const NewInSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/?sort=newest&limit=4");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching new products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 " id="new-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
              NEW IN
            </h2>
            <div className="w-16 h-1 mt-2 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">Loading new in...</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 px-4 " id="new-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
              NEW IN
            </h2>
            <div className="w-16 h-1 mt-2 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500"> No new products found. </p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16 px-4 " id="new-in">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            href={`/shop/product/${product.id}`}
            key={product.id}
            className="bg-white border rounded-xl overflow-hidden shadow-sm group relative block"
          >
            {/* IMAGE AREA */}
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
                <span className="text-secondary font-bold">
                  ₹{Number(product.price)}
                </span>
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
    </section>
  );
};

export default NewInSection;
