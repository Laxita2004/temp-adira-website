"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Link from "next/link";

const collections = [
  {
    title: "Jaal Work",
    image: "/saree1.png",
    link: "/collections/jaal",
  },
  {
    title: "Pittan Work",
    image: "/saree3.png",
    link: "/collections/pittan",
  },
  {
    title: "Printed Chiffon",
    image: "/saree2.png",
    link: "/collections/jaal",
  },
  {
    title: "Gota Patti Work",
    image: "/saree1.png",
    link: "/collections/jaal",
  },
  {
    title: "Cloud Chiffon",
    image: "/saree3.png",
    link: "/collections/jaal",
  },
  {
    title: "Leheriya Chiffon",
    image: "/saree1.png",
    link: "/collections/jaal",
  },
];

const Collection = () => {
  return (
    <div className="w-full px-4 pt-10 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8">
      <h2 className="text-center text-4xl font-bold text-primary mb-6">
        Featured Collection
      </h2>

      <Swiper
        modules={[Autoplay, EffectCoverflow, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        breakpoints={{
            0: {
                slidesPerView: 1.3,
            },
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }}
        className="w-full max-w-6xl mx-auto"
      >
        {collections.map((item, index) => (
            <SwiperSlide
            key={index}
            className="bg-muted shadow-lg rounded-lg overflow-hidden border border-muted transition-all duration-300"
            >
                <Image 
                src={item.image}
                alt={item.title}
                width={100}
                height={150}
                className="object-cover w-full h-80"
                />

                <div className="p-4 text-center">
                    <h3 className="text-lg font-medium text-primary">{item.title}</h3>
                    <Link
                    href={item.link}
                    className="mt-4 inline-block px-6 py-3 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition"
                    >
                        View Collection
                    </Link>
                </div>
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Collection;
