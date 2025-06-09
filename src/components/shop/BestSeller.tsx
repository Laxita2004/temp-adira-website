"use client";

import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaShoppingCart } from "react-icons/fa";

interface Product {
  name: string;
  price: string;
  imageUrl: string;
}

const bestSellers: Product[] = [
  {
    name: "Co-ord Set",
    price: "Rp. 150.124",
    imageUrl:
      "http://images.unsplash.com/photo-1584998316204-3b1e3b1895ae?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Class Dress",
    price: "Rp. 80.124",
    imageUrl:
      "https://images.unsplash.com/photo-1619794724492-651397287d94?q=80&w=990&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Monroe Dress",
    price: "Rp. 130.104",
    imageUrl:
      "https://images.unsplash.com/photo-1608912215571-61b7d5914b35?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Chanel Jacket",
    price: "Rp. 95.994",
    imageUrl:
      "https://images.unsplash.com/photo-1524255684952-d7185b509571?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bodycon Dresses",
    price: "Rp. 80.124",
    imageUrl:
      "https://images.unsplash.com/photo-1582533575066-75bd83ac91de?q=80&w=960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Denim Top",
    price: "Rp. 70.124",
    imageUrl:
      "https://images.unsplash.com/photo-1618375279997-351e32d80a02?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const BestSeller: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="best-seller-section" className="relative py-12 px-4">
      <h2 className="text-2xl font-semibold mb-6 px-4">Best Sellers</h2>

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
        {bestSellers.map((item, idx) => (
          <div
            key={idx}
            className="relative min-w-[320px] group rounded-xl overflow-hidden shadow-lg bg-white"
          >
            {/* Always-visible small cart icon */}
            <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-10">
              <FaShoppingCart className="text-primary" />
            </div>

            {/* Image */}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-80 object-cover"
            />

            {/* Hover overlay (DESKTOP ONLY) */}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-end p-4 hidden md:flex">
              <p className="text-white font-semibold text-sm mb-2">{item.name}</p>
              <p className="text-white font-semibold text-sm mb-2">{item.price}</p>
              <button className="bg-white text-primary px-3 py-1 text-xs font-medium rounded-full flex items-center gap-2 self-start hover:bg-primary hover:text-white transition">
                <FaShoppingCart className="text-sm" /> Add to Cart
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
