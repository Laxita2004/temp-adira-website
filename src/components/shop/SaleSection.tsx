"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("/api/offers/active");
        const data = await res.json();
        console.log("Fetched offers:", data);
        if (data.success) {
          setOffers(data.offers);
        }
      } catch (error) {
        console.error("Failed to fetch active offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading sales...</div>;
  }

  return (
    <section className="bg-muted py-12 px-4" id="sale-section">
      <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            SALE
          </h2>
          <div className="w-16 h-1 mt-2 bg-primary rounded-full"></div>
        </div>
        {offers.length > 0 && (
          <Link href={`/shop/all?offerId=all`}>
            <button className="text-sm text-primary hover:underline">
              View All
            </button>
          </Link>
        )}
      </div>

      {offers.length === 0 ? (
        <div className="text-center text-gray-600">No active sales right now.</div>
      ) : (
        offers.map((offer) => (
          <div key={offer.id} className="mb-12">
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
              <Link href={`/shop/all?offerId=${offer.id}`}>
                <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-primary hover:text-white transition">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default SalesSection;
