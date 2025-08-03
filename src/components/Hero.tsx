"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const youtubeSources = ["L3ydZM-IeKQ"];

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const currentVideoId = youtubeSources[currentVideoIndex];

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
          Preserving heritage <br />
          with a touch of <br />
          modernity.
        </h2>
        <div className="mt-8 flex justify-center md:justify-start gap-6">
          <Link
            href="/shop/all?category=saree"
            className="text-base md:text-lg lg:text-xl bg-transparent border border-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Shop Sarees
          </Link>
          <Link
            href="/shop/all?category=poshak"
            className="text-base md:text-lg lg:text-xl bg-transparent border border-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Shop Poshaks
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
