"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FadeInSection from "./FadeIn";

const collections = [
  {
    name: "Rangresa",
    tagline: "Sarees for Cocktail & Nighttime Glamour",
    image: "/rangresa.png",
    href: "/collections/rangresa",
  },
  {
    name: "Noir Enchanté",
    tagline: "Sarees for Cocktail & Nighttime Glamour",
    image: "/noir.png",
    href: "/collections/noir-enchante",
  },
  {
    name: "Éclore",
    tagline: "Printed Sarees in Vibrant Motifs",
    image: "/eclore.png",
    href: "/collections/ecloire",
  },
  {
    name: "Gauze & Gulaal",
    tagline: "Delicate Handpainted Sarees",
    image: "/gauze.png",
    href: "/collections/gauze&gulaal",
  },
  {
    name: "Viraasat",
    tagline: "Bold Colors & Artistic Expressions",
    image: "/viraasat.png",
    href: "/collections/viraasat",
  },
];

const Themes = () => {
  return (
    <section className="bg-muted py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold text-primary mb-2">Our Signature Collections</h2>
        <p className="text-gray-600">Curated sarees for every mood and moment</p>
      </div>
      <FadeInSection>
<div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {collections.map((col) => (
          <Link 
          href={col.href} 
          key={col.name} 
          className="group bg-white shadow rounded-xl overflow-hidden overflow-hidden transition-transform hover:scale-[1.04]  w-[45%] sm:w-[40%] md:w-[28%] xl:w-[22%] max-w-xs h-[300px] flex flex-col"
          >
            <div className="relative w-full h-[400px] overflow-hidden">
              <Image
                src={col.image}
                alt={col.name}
                fill
                className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-[1.08]"
              />
            </div>
            <div className="flex-grow p-4 text-center flex flex-col justify-center h-[80px] sm:h-auto">
              <h3 className="text-lg font-semibold text-primary">{col.name}</h3>
              <p className="text-sm text-gray-500">{col.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
      </FadeInSection>
      
    </section>
  );
};

export default Themes;