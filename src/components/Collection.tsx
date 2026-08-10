"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-coverflow";

type Pattern = {
  id: number;
  name: string;
  imageUrl: string;
};

const Collection = () => {
  const [collections, setCollections] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);

  const formatPatternName = (name: string) => {
    return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const res = await fetch("/api/patterns");
        if (!res.ok) throw new Error("Failed to fetch collections");

        const data: Pattern[] = await res.json();
        setCollections(data);
      } catch (err) {
        console.error("Error loading collections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  if (loading) {
    return (
      <section className="w-full px-4 pt-10 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8">
        <h2 className="text-center text-4xl font-bold text-primary mb-10">
          Featured Collection
        </h2>
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500"> Loading collections... </p>{" "}
        </div>
      </section>
    );
  }

  if (collections.length === 0) {
    return (
      <section className="w-full px-4 pt-10 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8">
        <h2 className="text-center text-4xl font-bold text-primary mb-10">
          Featured Collection
        </h2>
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500"> No collections found. </p>{" "}
        </div>
      </section>
    );
  }
  
  return (
    <section className="w-full px-4 pt-10 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8">
      <h2 className="text-center text-4xl font-bold text-primary mb-10">
        Featured Collection
      </h2>

      <Swiper
        modules={[Autoplay, EffectCoverflow, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={collections.length > 3}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1.3 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {collections.map((item, index) => (
          <SwiperSlide
            key={index}
            className="bg-background border border-muted shadow-md rounded-xl overflow-hidden"
          >
            <div className="relative w-full h-80">
              <Image
                src={item.imageUrl}
                alt={`${formatPatternName(item.name)} saree`}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 text-center bg-white">
              <h3 className="text-lg font-semibold text-primary mb-2">
                {formatPatternName(item.name)}
              </h3>
              <Link
                href={`/shop/all?pattern=${encodeURIComponent(item.name)}`}
                className="inline-block px-5 py-2 border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition duration-300"
              >
                View Collection
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Collection;
