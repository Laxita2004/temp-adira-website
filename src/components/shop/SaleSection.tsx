"use client";

import React, { useEffect, useState } from "react";

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

type Product = {
  id: number;
  title: string;
  image: string;
};

type Offer = {
  id: number;
  title: string;
  discountValue: number;
  bannerUrl: string;
  products: Product[];
};

const SalesSection = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("/api/offers/active");
        const data = await res.json();
        if (data.success) {
          setOffers(data.offers); // Adjust if key is different
        }
      } catch (error) {
        console.error("Failed to fetch active offers:", error);
      }
    };

    fetchOffers();
  }, []);

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


      {/* Loop through active offers */}
      {offers.map((offer) => (
        <div key={offer.id} className="mb-12">
          {/* Sale Banner */}
          <div
            className="relative bg-cover bg-center text-white text-center py-16 px-4 rounded-xl mb-6"
            style={{ backgroundImage: `url(${offer.bannerUrl})` }}
          >
            <h4 className="text-m tracking-widest text-primary font-bold uppercase">
              {offer.title}
            </h4>
            <h2 className="text-4xl font-extrabold mt-2 mb-2">SALES</h2>
            <p className="text-lg font-medium mb-4">Mega Discount</p>
            <p className="text-sm">UPTO {offer.discountValue}% OFF</p>
            <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-primary hover:text-white transition">
              Shop Now
            </button>
          </div>

          {/* Offer Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {offer.products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-primary font-bold mb-2">
                  {offer.discountValue}% Offer
                </p>
                <button className="bg-primary text-white px-4 py-1 rounded-full text-sm hover:bg-secondary transition">
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SalesSection;