"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SareeCareGuide: React.FC = () => {
  return (
    <>
    <Header/>
      <div className="bg-light py-10 px-4 md:px-10 text-gray-800 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Saree Care Guide</h1>
          <p className="mb-6">
            Every Adira saree is a work of art — woven with love and made to
            last when cared for properly. Here's how to keep your saree
            beautiful for years to come:
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Pure Chiffons, Pure Georgettes, Tissue & Organza:</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Do <strong>not wash at home</strong>. Always opt for
                professional dry cleaning.
              </li>
              <li>
                <strong>No ironing</strong> – pure chiffons are heat-sensitive.
                Use steam press only.
              </li>
              <li>Keep away from water, sweat, and direct perfume sprays.</li>
              <li>
                Store separately in a muslin or soft cotton bag to avoid
                snagging.
              </li>
              <li>
                Handle gently – pure chiffon is a delicate fabric by nature.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              Cloud Chiffons, Georgette, Tissue & Organza
            </h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                These fabrics are <strong>home washable</strong> with mild
                detergent in cold water.
              </li>
              <li>Do not wring or twist. Always air dry in shade.</li>
              <li>
                Iron inside out on low to medium heat or use a steam press.
              </li>
              <li>
                Store in a cool, dry place — preferably wrapped in soft fabric.
              </li>
            </ul>
          </section>

          <section>
            <p className="text-base">
              Taking a little extra care goes a long way. Treat your saree like
              a treasure, and it will always return the favor in elegance.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SareeCareGuide;
