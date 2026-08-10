"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const youtubeSources = ["FvRMvZTDsiY"];

function capitalizeWords(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Hero = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const currentVideoId = youtubeSources[currentVideoIndex];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Youtube Embed Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
        <iframe
          className="w-[400%] h-[170.5%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=${currentVideoId}`}
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />

      {/* Slogan + Buttons */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight">
          Woven with time, <br />
          meant to <br />
          outlive it.
        </h2>
        <div className="mt-8 flex justify-center md:justify-start gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/all?category=${encodeURIComponent(cat.name)}`}
              className="text-base md:text-lg lg:text-xl border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              Shop {capitalizeWords(cat.name)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
