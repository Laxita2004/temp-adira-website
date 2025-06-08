"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    quote: "Absolutely love the collection! I got so many compliments.",
    name: "Hkm. Pushpa Solanki",
    location: "Sanawad",
  },
  {
    quote: "Every saree I ordered was better than I imagined. So graceful!",
    name: "Megha Patel",
    location: "Ahmedabad",
  },
  {
    quote: "Beautiful poshaks and very prompt service. Loved the packaging!",
    name: "Ritu Sharma",
    location: "Udaipur",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-primary text-white py-16 px-6 mt-[30px]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="relative"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="text-center px-6">
                  <FaQuoteLeft className="text-secondary text-2xl mx-auto mb-4" />
                  <p className="text-xl italic mb-4 w-[">{item.quote}</p>
                  <FaQuoteRight className="text-secondary text-2xl mx-auto mb-2" />
                  <p className="text-sm font-semibold mt-4">
                    ~ {item.name} <br />
                    <span className="text-sm font-normal">{item.location}</span>
                  </p>
                </div>
              </SwiperSlide>
            ))}

          </Swiper>
        </div>

        {/* RIGHT */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold mb-2">Testimonials</h2>
          <p className="text-white/90 mb-4">
            Become a part of the Adira family!
          </p>
          <p className="text-white/70 mb-6">
            Sign up and follow us on Instagram for latest updates
          </p>
          <button className="bg-white text-primary font-semibold px-6 py-2 rounded-full border hover:bg-primary hover:text-white hover:border-white transition">
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
