"use client";

import React from "react";
import Link from "next/link";
import { FaShoppingCart, FaEye } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "saree",
    image:
      "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$122.00",
    originalPrice: "$156.00",
    rating: 4.9,
    reviews: 225,
    isNew: true,
  },
  {
    id: 2,
    name: "saree",
    image:
      "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$122.00",
    originalPrice: "$156.00",
    rating: 4.9,
    reviews: 225,
    isNew: true,
  },
  {
    id: 3,
    name: "saree",
    image:
      "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$122.00",
    originalPrice: "$156.00",
    rating: 4.9,
    reviews: 225,
    isNew: true,
  },
  {
    id: 4,
    name: "saree",
    image:
      "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$122.00",
    originalPrice: "$156.00",
    rating: 4.9,
    reviews: 225,
    isNew: true,
  },
  {
    id: 5,
    name: "saree",
    image:
      "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$122.00",
    originalPrice: "$156.00",
    rating: 4.9,
    reviews: 225,
    isNew: true,
  },
];

const AllSection = () => {
  return (
    <section className="px-4 md:px-10 py-16 bg-light">
      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-8 text-sm text-gray-600 gap-2">
        <div className="flex gap-4">
          <span>Size</span>
          <span>Sale</span>
          <span>Product Type</span>
        </div>
        <div>
          <span className="cursor-pointer underline">More Filter</span> ·{" "}
          <span>Recommended</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl overflow-hidden shadow-sm group relative"
          >
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                New Arrival
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-medium">{product.name}</h3>

              <div className="mt-2 text-sm">
                <span className="font-bold">{product.price}</span>
                <span className="text-gray-400 line-through ml-2">
                  {product.originalPrice}
                </span>
              </div>
            </div>
            {/* Hover Add to Cart */}
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-sm px-4 py-2 rounded-md opacity-0 transition">
              Add to Cart
            </button>

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
    </section>
  );
};

export default AllSection;
