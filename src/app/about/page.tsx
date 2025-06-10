// app/about/page.tsx or pages/about.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import FadeInSection from "@/components/FadeIn";
import {
  FaTshirt,
  FaCut,
  FaLeaf,
  FaExchangeAlt,
  FaPaintBrush,
  FaShoppingBag,
} from "react-icons/fa";

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <section className="relative h-screen w-full bg-gradient-to-r from-[#f5f5f5] to-[#5e0f0f] text-white">
        {/* Background Image */}
        {/* <Image
          src="/about/founder.png"
          alt="Founder"
          fill
          priority
          className="object-cover object-center"
        /> */}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />

        {/* Text Content */}
        <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between h-full px-6 lg:px-20 text-white">
          {/* Center Column (Intro/Quote) */}
          <div className="flex-1 text-center lg:text-left mb-10 lg:mb-0">
            <FadeInSection>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-wide mb-4 leading-snug">
                Passion Meets Purpose
              </h2>
              <p className="text-lg lg:text-xl text-white/80 max-w-md mx-auto lg:mx-0">
                At the heart of Adira lies a desire to fuse tradition with a
                contemporary soul — a journey that starts with our founder’s
                dedication.
              </p>
            </FadeInSection>
          </div>

          {/* Right Column (Founder Bio) */}
          <div className="flex-1 text-center lg:text-right lg:pl-12 max-w-xl">
            <FadeInSection>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-wide mb-4">
                Meet the Founder
              </h2>
              <h3 className="text-xl lg:text-2xl text-[#f8d7c0] mb-6 font-medium">
                Mrs. Dharmnishtha Singh Thakur
              </h3>
              <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                With a vision to blend timeless heritage with modern elegance,
                Mrs. Dharmnishtha has dedicated her journey to reviving the soul
                of traditional Indian craftsmanship. Her belief in sustainable
                fashion and empowering artisans drives the essence of Adira.
              </p>
              <div className="mt-6 text-sm italic text-white/70">
                "Tradition is not the worship of ashes, but the preservation of
                fire."
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-20 px-6 lg:px-20"
        style={{
          backgroundImage: `url('/about/about.png')`, // Replace with your own image path
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <FadeInSection>
          <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 tracking-tight">
              What Drives Us at Adira
            </h2>

            {/* Mission */}
            <div className="mb-12">
              <h3 className="text-3xl lg:text-3xl font-semibold text-muted mb-4">
                Our Essence – The Mission
              </h3>
              <p className="text-xl leading-relaxed max-w-3xl mx-auto text-white/90">
                At Adira, we’re committed to preserving the spirit of Indian
                craftsmanship while embracing modern elegance. Our mission is to
                offer timeless fashion that empowers individuals and supports
                local artisans.
              </p>
            </div>

            {/* Vision */}
            <div className="mb-12">
              <h3 className="text-3xl lg:text-3xl font-semibold text-muted mb-4">
                Our Horizon – The Vision
              </h3>
              <p className="text-xl leading-relaxed max-w-3xl mx-auto text-white/90">
                We envision a world where fashion is both conscious and
                expressive — where heritage fabrics meet contemporary designs,
                and every outfit tells a story of sustainability, identity, and
                pride.
              </p>
            </div>

            {/* Values */}
            <div className="mb-16">
              <h3 className="text-3xl lg:text-3xl font-semibold text-muted mb-4">
                Our Soul – The Values
              </h3>
              <p className="text-xl leading-relaxed max-w-3xl mx-auto text-white/90">
                We stand by authenticity, sustainability, empowerment, and the
                celebration of culture. These values shape every stitch and
                every interaction at Adira.
              </p>
            </div>

            {/* What We Offer */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-muted mb-6">
                What We Bring to Your Wardrobe
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg max-w-4xl mx-auto text-left">
                <li className="bg-light text-gray-800 shadow-md rounded-xl p-6 flex items-center gap-4">
                  <FaTshirt className="text-[#5e0f0f] text-xl" />
                  Handcrafted Ethnic Wear
                </li>
                <li className="bg-light text-gray-800 shadow-md rounded-xl p-6 flex items-center gap-4">
                  <FaCut className="text-[#5e0f0f] text-xl" />
                  Bespoke Custom Tailoring
                </li>
                <li className="bg-light text-gray-800 shadow-md rounded-xl p-6 flex items-center gap-4">
                  <FaLeaf className="text-[#5e0f0f] text-xl" />
                  Sustainable Fashion Pieces
                </li>
                <li className="bg-light text-gray-800 shadow-md rounded-xl p-6 flex items-center gap-4">
                  <FaExchangeAlt className="text-[#5e0f0f] text-xl" />
                  Fusion Apparel Collections
                </li>
                <li className="bg-light text-gray-800 shadow-md rounded-xl p-6 flex items-center gap-4">
                  <FaPaintBrush className="text-[#5e0f0f] text-xl" />
                  Hand-embroidered Artistry
                </li>
                <li className="bg-light text-gray-800 shadow-md rounded-xl p-6 flex items-center gap-4">
                  <FaShoppingBag className="text-[#5e0f0f] text-xl" />
                  Accessories with a Story
                </li>
              </ul>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }} // Put your store image in public/images
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div
          ref={ref}
          className="relative z-10 flex flex-col items-center justify-center h-full w-full px-8 text-white text-center"
        >
          <FadeInSection>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Journey Began Here
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed text-white/90 max-w-3xl">
              It all started with a simple dream — to create a space where
              timeless elegance meets modern expression. Nestled in the heart of
              the city, our first store opened its doors not just to customers,
              but to a growing community of dreamers, doers, and lovers of
              craft. From the aroma of fresh fabrics to the warmth of human
              connection, every corner of our store tells a story of passion,
              perseverance, and purpose.
            </p>
          </FadeInSection>
        </div>
      </section>
    </>
  );
};

export default About;
