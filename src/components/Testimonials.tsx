"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaInstagram, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    quote: "Absolutely love the collection! I got so many compliments.",
    name: "Pushpalata Ji Solanki",
    location: "Sanawad",
  },
  {
    quote: "The pittan work was even more beautiful in person, and the fabric felt so light and luxurious. So graceful!",
    name: "Anushree Ji Thakur",
    location: "Washington, D.C., USA",
  },
  {
    quote: "Blown away by the quality and detailing! Every saree I ordered was better than I imagined.",
    name: "Minu Ji Soni",
    location: "Indore",
  },
  {
    quote: "Beautiful sarees and very prompt service!",
    name: "Mitali Ji Thakur",
    location: "Lucknow",
  },
  {
    quote: "Loved the black saree I ordered – it was perfect for the cocktail party! Got so many compliments on it.",
    name: "Kritika Ji Dongre",
    location: "Netherlands",
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
            Follow us on Instagram and join our whatsapp community for latest
            updates
            <br />
            (A little secret: We offer upto 15% off to our instagram followers!)
          </p>
          <a
            href="https://www.instagram.com/adirachiffons?igsh=N2FxaDBidHVpeTcx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-lg bg-white text-primary font-semibold px-6 py-2 rounded-full border hover:bg-primary hover:text-white hover:border-white transition"
          >
            <FaInstagram className="mr-2" />
            <span>adirachiffons</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
