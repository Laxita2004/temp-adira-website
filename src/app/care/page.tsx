"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SareeCareGuide: React.FC = () => {
  return (
    <>
      <Header />
      <div className="bg-light py-10 px-4 md:px-10 text-gray-800 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Saree Care Guide</h1>
          <p className="mb-6">
            A well-made saree is meant to stay with you for years. With the
            right care, your chiffon can retain its softness, drape and delicate
            craftsmanship for generations. Here are a few simple practices to
            help preserve your saree and keep it looking as beautiful as the day
            you received it.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              01. Let it breathe after wearing
            </h2>
            <p className="text-base leading-7">
              Don't fold your saree and put it straight back into the wardrobe
              after wearing it. Allow it to air out for a few hours in a clean,
              dry place before storing it away. This helps release any moisture,
              body heat or traces of humidity absorbed while wearing it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              02. Keep perfume away from the fabric
            </h2>
            <p className="text-base leading-7">
              Never spray perfume or deodorant directly onto your saree. The
              alcohol and other ingredients in fragrances can affect delicate
              fabrics and embroidery over time. Apply your perfume to your skin
              and allow it to settle before draping your saree.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">03. Dry clean only</h2>
            <p className="text-base leading-7">
              Pure chiffon and delicate hand embroidery require gentle handling.
              We recommend <strong>dry cleaning only</strong> and avoiding
              washing the saree at home. Do not wring, scrub or use harsh
              detergents, as these can affect the delicate fibres, colour and
              handcrafted embellishments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              04. Give it a little sunlight
            </h2>
            <p className="text-base leading-7">
              Once or twice a year, let your saree enjoy a little gentle morning
              sunlight. Lay it out in a clean, shaded or softly sunlit space for
              a short period rather than exposing it to strong, harsh midday
              sunlight. This helps freshen the fabric naturally.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              05. Store it wrapped in cotton
            </h2>
            <p className="text-base leading-7">
              Always store your chiffon saree wrapped in a clean, breathable{" "}
              <strong>cotton or muslin cloth</strong>. This protects the fabric
              from dust, moisture and friction while allowing it to breathe.
              Avoid storing delicate chiffon directly in plastic for long
              periods, as trapped moisture can affect the fabric over time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              A little extra care goes a long way
            </h2>
            <p className="text-base leading-7">
              For sarees with intricate embroidery, sequins, zari, resham or
              other delicate handwork, handle the drape gently and avoid pulling
              or catching the embellishments on jewellery or rough surfaces.
              When folding, avoid placing excessive weight on top of the saree.
            </p>

            <p className="text-base leading-7">
              A saree made with time and skilled hands deserves to be cared for
              with the same thoughtfulness. Wear it often, care for it gently,
              and let it gather stories over the years.
            </p>
          </section>
          

        </div>
      </div>
      <Footer />
    </>
  );
};

export default SareeCareGuide;
