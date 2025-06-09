"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["Best Seller", "Sale", "New In", "View All"];

const TopBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Best Seller");
  const router = useRouter();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category);
    if (category === "Best Seller") {
    document
      .getElementById("best-seller-section")
      ?.scrollIntoView({ behavior: "smooth" });
  } else if(category === "Sale") {
    document
      .getElementById("sale-section")
      ?.scrollIntoView({ behavior: "smooth" });
  } else if(category === "New In") {
    document
      .getElementById("new-in-section")
      ?.scrollIntoView({ behavior: "smooth" });
  } else if(category === "View All") {
    router.push("/shop/all");
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
