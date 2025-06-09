"use client";

import React, { useState } from "react";

const categories = ["Best Seller", "Sale", "New In", "Pastel Collection"];

const TopBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Best Seller");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category);
    if (category === "Best Seller") {
    document
      .getElementById("best-seller-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {categories.map((category, index) =>
        category ? (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all
              ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-muted border border-primary text-primary hover:bg-secondary hover:text-white"
              }`}
          >
            {category}
          </button>
        ) : null
      )}
    </div>
  );
};

export default TopBar;
