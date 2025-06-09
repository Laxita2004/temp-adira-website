"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-coverflow";

const collections = [
  {
    title: "Jaal Work",
    image: "https://images.unsplash.com/photo-1609748340878-c690e3e4706b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "/collections/jaal",
  },
  {
    title: "Pittan Work",
    image: "https://images.unsplash.com/photo-1609748341642-ae4c6562bf3d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "/collections/pittan",
  },
  {
    title: "Printed Chiffon",
    image: "https://images.unsplash.com/photo-1609748340041-f5d61e061ebc?q=80&w=1009&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "/collections/printed-chiffon",
  },
  {
    title: "Gota Patti Work",
    image: "https://images.unsplash.com/photo-1609748340756-aeb8223d6c64?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "/collections/gota",
  },
  {
    title: "Cloud Chiffon",
    image: "https://images.unsplash.com/photo-1609748340878-c690e3e4706b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "/collections/cloud",
  },
  {
    title: "Leheriya Chiffon",
    image: "https://images.unsplash.com/photo-1609748340041-f5d61e061ebc?q=80&w=1009&auto=format&fit=crop&ixlib=rb-4.1.0",
    link: "/collections/leheriya",
  },
];

const Collection = () => {
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
        loop={true}
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
                src={item.image}
                alt={`${item.title} saree`}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 text-center bg-white">
              <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
              <Link
                href={item.link}
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
