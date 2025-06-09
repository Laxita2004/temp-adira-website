"use client";

import React from "react";

const salesItems = [
  {
    title: "Cotton Sarees",
    discount: "50%",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Printed Chiffons",
    discount: "60%",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Gota Pattis",
    discount: "30%",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Vintage Vibes",
    discount: "40%",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const SalesSection = () => {
  return (
    <section className="bg-muted py-12 px-4" id="sale-section">

        <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            SALE
          </h2>
          <div className="w-16 h-1 mt-2 bg-primary rounded-full"></div>
        </div>
        {/* Optional link/button */}
        <button className="text-sm text-primary hover:underline">
          View All
        </button>
      </div>


      {/* Top Banner */}
      <div
        className="relative bg-cover bg-center text-white text-center py-16 px-4 rounded-xl mb-10"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1672883551967-ab11316526b4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <h4 className="text-m tracking-widest text-primary font-bold uppercase">
          DIWALI
        </h4>
        <h2 className="text-4xl font-extrabold mt-2 mb-2">SALES</h2>
        <p className="text-lg font-medium mb-4">Mega Discount</p>
        <p className="text-sm">UPTO 70% OFF | THIS WEEK ONLY</p>
        <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-primary hover:text-white transition">
          Shop Now
        </button>
      </div>

      {/* Offer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {salesItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-primary font-bold mb-2">
              {item.discount} Offer
            </p>
            <button className="bg-primary text-white px-4 py-1 rounded-full text-sm hover:bg-secondary transition">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SalesSection;
