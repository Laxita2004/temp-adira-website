"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CartPage = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ""));
      return sum + price;
    }, 0);
  };

  const handleRemove = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <>
      <Header />
      <div className="bg-light">
     <div className="max-w-6xl mx-auto px-4 py-10 mt-20 bg-light">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            Cart
          </h2>
          <div className="w-16 h-1 mt-2 bg-primary rounded-full"></div>
        </div>
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-md shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{item.price}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-sm text-red-500 hover:underline mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Summary Section */}
          <div className="mt-10 border-t pt-6 text-right">
            <p className="text-xl font-semibold">
              Subtotal: ₹{getTotal().toLocaleString()}
            </p>
            <p className="text-green-700 text-sm mt-1">Free delivery</p>

            <div className="mt-4 flex flex-col md:flex-row gap-4 justify-end">
              <button className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-md">
                Continue Shopping
              </button>
              <button className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-md">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
     
      <Footer />
    </>
  );
};

export default CartPage;
