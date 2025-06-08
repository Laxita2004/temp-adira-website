"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const videoSources = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
];

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    }, 5000); // switch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        key={currentVideoIndex}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSources[currentVideoIndex]}
        autoPlay
        muted
        playsInline
        loop={false} // we want to change manually
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Slogan + Buttons */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight">
            Preserving heritage <br />with a touch of <br />modernity. 
          </h2>
        <div className="mt-8 flex justify-center md:justify-start gap-6">
          <Link
            href="/sarees"
            className="text-base md:text-lg lg:text-xl bg-transparent border border-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Shop Sarees
          </Link>
          <Link
            href="/poshaks"
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
