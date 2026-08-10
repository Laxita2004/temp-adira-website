"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeInSection from "./FadeIn";

type Theme = {
  id: number;
  name: string;
  tagline: string;
  imageUrl: string;
};

const Themes = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const formatThemeName = (name: string) => {
    return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await fetch("/api/themes");
        const data = await res.json();
        setThemes(data);
      } catch (err) {
        console.error("Failed to fetch themes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  if (loading) {
    return (
      <section className="bg-muted w-full px-4 py-10 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-primary mb-4">
            By Craft & Karigiri
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover sarees shaped by the hands, techniques and traditions of
            Indian artisans
          </p>
        </div>
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500"> Loading products... </p>{" "}
        </div>
      </section>
    );
  }

  if (themes.length === 0) {
    return (
      <section className="bg-muted w-full px-4 py-10 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-primary mb-4">
              By Craft & Karigiri{" "}
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Discover sarees shaped by the hands, techniques and traditions of
              Indian artisans
            </p>
          </div>
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500"> No products found. </p>{" "}
        </div>
      </section>
    );
  }
  return (
    <section className="bg-muted py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold text-primary mb-2">
          By Craft & Karigiri
        </h2>
        <p className="text-gray-600">
          Discover sarees shaped byy the hands, techniques and traditions of
          Indian artisans
        </p>
      </div>
      <FadeInSection>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {themes.map((col) => (
            <Link
              href={`/shop/all?theme=${encodeURIComponent(col.name)}`}
              key={col.id}
              className="group bg-white shadow rounded-xl overflow-hidden overflow-hidden transition-transform hover:scale-[1.04]  w-[45%] sm:w-[40%] md:w-[28%] xl:w-[22%] max-w-xs h-[300px] flex flex-col"
            >
              <div className="relative w-full h-[400px] overflow-hidden">
                <Image
                  src={col.imageUrl}
                  alt={formatThemeName(col.name)}
                  fill
                  className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-[1.08]"
                />
              </div>
              <div className="flex-grow p-4 text-center flex flex-col justify-center h-[80px] sm:h-auto">
                <h3 className="text-lg font-semibold text-primary">
                  {formatThemeName(col.name)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
};

export default Themes;
