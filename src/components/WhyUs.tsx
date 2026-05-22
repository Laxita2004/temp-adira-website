"use client"

// import Link from "next/link";
import React from "react";
import { FaStar, FaPalette, FaHeart } from "react-icons/fa";

const features = [
  {
    icon: <FaStar size={32} />,
    title: "Artisan Craftsmanship",
    description: "Each piece is handcrafted with love and attention to detail.",
  },
  {
    icon: <FaPalette size={32} />,
    title: "Personalized Care",
    description: "From packaging to delivery, your satisfaction is our priority.",
  },
  {
    icon: <FaHeart size={32} />,
    title: "Heartfelt Service",
    description: "We serve with humility and treat every customer like family.",
  },
];

const WhyUs = () => {
    return (
        <section className="bg-muted py-14 mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">
                Crafted With Care, Delivered With Love
            </h2>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center group transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-white border-2 border-transparent group-hover:bg-muted group-hover:border-primary sm group-hover:scale-110 transition-all duration-300">
              <div className="text-white group-hover:text-primary  transition duration-300">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-primary transition">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-m text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
        </section>
    )
} 

export default WhyUs;