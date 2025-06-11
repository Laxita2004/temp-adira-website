"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dummyProducts = [
  {
    id: "1",
    name: "Chiffon Saree - Midnight Blue",
    image: "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2",
    price: "₹9,999",
    description: "Elegant midnight blue chiffon saree with golden zari work.",
  },
  // ...other products
];

const ProductPage = () => {
  const params = useParams();
  const productId = params?.id;
  const router = useRouter();

  const product = dummyProducts.find((p) => p.id === productId);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-12 bg-light mt-20">
        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 rounded-xl shadow"
          />
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl text-green-700">{product.price}</p>
            <p>{product.description}</p>
            <button
              onClick={handleAddToCart}
              className="bg-primary text-white px-6 py-2 rounded-md"
            >
              Add to Cart
            </button>
            
            {/* <button className="bg-primary text-white px-6 py-2 rounded-md">
              Buy Now
            </button> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;