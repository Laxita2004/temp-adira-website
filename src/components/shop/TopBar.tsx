"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = ["Best Seller", "Sale", "New In", "View All"];

const TopBarContent = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("Best Seller");

  const router = useRouter();
  const searchParams = useSearchParams();

  const scrollToSection = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const section = searchParams.get("section");

    if (section === "sale") {
      setSelectedCategory("Sale");

      setTimeout(() => {
        scrollToSection("sale-section");
      }, 100);
    } else if (section === "new-in") {
      setSelectedCategory("New In");

      setTimeout(() => {
        scrollToSection("new-in");
      }, 100);
    } else {
      setSelectedCategory("Best Seller");

      setTimeout(() => {
        scrollToSection("best-seller");
      }, 100);
    }
  }, [searchParams]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);

    if (category === "Best Seller") {
      scrollToSection("best-seller");
    } else if (category === "Sale") {
      scrollToSection("sale-section");
    } else if (category === "New In") {
      scrollToSection("new-in");
    } else if (category === "View All") {
      router.push("/shop/all");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category
              ? "bg-primary text-white"
              : "bg-muted border border-primary text-primary hover:bg-secondary hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const TopBar = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              disabled
              className="px-5 py-2 rounded-full text-sm font-medium bg-muted border border-primary text-primary opacity-70"
            >
              {category}
            </button>
          ))}
        </div>
      }
    >
      <TopBarContent />
    </Suspense>
  );
};

export default TopBar;

