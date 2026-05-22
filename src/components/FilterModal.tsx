"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Pattern = {
  id: number;
  name: string;
};

type Material = {
  id: number;
  name: string;
};

type Theme = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
};

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter options
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Loading state
  const [loadingFilters, setLoadingFilters] = useState(false);

  // Selected filters
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );

  const [selectedPattern, setSelectedPattern] = useState(
    searchParams.get("pattern") || "",
  );

  const [selectedMaterial, setSelectedMaterial] = useState(
    searchParams.get("material") || "",
  );

  const [selectedTheme, setSelectedTheme] = useState(
    searchParams.get("theme") || "",
  );

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");

  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const offerId = searchParams.get("offerId");

  /**
   * Fetch filters ONLY when modal opens
   */
  useEffect(() => {
    if (!isOpen) return;

    const fetchFilters = async () => {
      try {
        setLoadingFilters(true);

        const [categoriesRes, patternsRes, materialsRes, themesRes] =
          await Promise.all([
            fetch("/api/categories"),
            fetch("/api/patterns"),
            fetch("/api/materials"),
            fetch("/api/themes"),
          ]);

        if (
          !categoriesRes.ok ||
          !patternsRes.ok ||
          !materialsRes.ok ||
          !themesRes.ok
        ) {
          throw new Error("Failed to fetch filters");
        }

        const categoriesData = await categoriesRes.json();
        const patternsData = await patternsRes.json();
        const materialsData = await materialsRes.json();
        const themesData = await themesRes.json();

        setCategories(categoriesData);
        setPatterns(patternsData);
        setMaterials(materialsData);
        setThemes(themesData);
      } catch (err) {
        console.error("Error fetching filters:", err);
      } finally {
        setLoadingFilters(false);
      }
    };

    fetchFilters();
  }, [isOpen]);

  /**
   * Sync selected filters when modal opens
   */
  useEffect(() => {
    if (!isOpen) return;

    setSelectedCategory(searchParams.get("category") || "");
    setSelectedPattern(searchParams.get("pattern") || "");
    setSelectedMaterial(searchParams.get("material") || "");
    setSelectedTheme(searchParams.get("theme") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSort(searchParams.get("sort") || "");
  }, [isOpen, searchParams]);

  /**
   * Apply filters
   */
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory) params.set("category", selectedCategory);
    else params.delete("category");

    if (selectedPattern) {
      params.set("pattern", selectedPattern);
    } else {
      params.delete("pattern");
    }

    if (selectedMaterial) {
      params.set("material", selectedMaterial);
    } else {
      params.delete("material");
    }

    if (selectedTheme) {
      params.set("theme", selectedTheme);
    } else {
      params.delete("theme");
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    // preserve offerId if exists
    if (offerId) {
      params.set("offerId", offerId);
    }

    onClose();

    // Better UX than push for filters
    router.replace(`?${params.toString()}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-light w-[90%] max-w-md rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-6">Filter Products</h2>

        {loadingFilters ? (
          <p>Loading filters...</p>
        ) : (
          <div className="space-y-4">
            {/* Category */}
            <div>
              <label className="text-gray-700 block text-sm font-medium mb-1">
                Category
              </label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-gray-700 w-full bg-muted border rounded px-3 py-2"
              >
                <option value="">All</option>

                {categories.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pattern */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Pattern
              </label>

              <select
                value={selectedPattern}
                onChange={(e) => setSelectedPattern(e.target.value)}
                className="text-gray-700 w-full bg-muted border rounded px-3 py-2"
              >
                <option value="">All</option>

                {patterns.map((pattern) => (
                  <option key={pattern.id} value={pattern.name}>
                    {pattern.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Material */}
            <div>
              <label className="text-gray-700 block text-sm font-medium mb-1">
                Material
              </label>

              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="text-gray-700 w-full bg-muted border rounded px-3 py-2"
              >
                <option value="">All</option>

                {materials.map((material) => (
                  <option key={material.id} value={material.name}>
                    {material.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="text-gray-700 block text-sm font-medium mb-1">
                Collection
              </label>

              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="text-gray-700 w-full bg-muted border rounded px-3 py-2"
              >
                <option value="">All</option>

                {themes.map((theme) => (
                  <option key={theme.id} value={theme.name}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-gray-700 block text-sm font-medium mb-1">
                  Min Price
                </label>

                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="text-gray-700 w-full bg-muted border rounded px-3 py-2"
                  placeholder="₹ min"
                />
              </div>

              <div className="flex-1">
                <label className="text-gray-700 block text-sm font-medium mb-1">
                  Max Price
                </label>

                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="text-gray-700 w-full bg-muted border rounded px-3 py-2"
                  placeholder="₹ max"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-gray-700 block text-sm font-medium mb-1">
                Sort
              </label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-gray-700 w-full bg-muted border rounded px-3 py-2"
              >
                <option value="">Recommended</option>

                <option value="lowToHigh">Price: Low to High</option>

                <option value="highToLow">Price: High to Low</option>

                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Apply */}
            <button
              onClick={applyFilters}
              className="mt-6 w-full bg-primary text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterModal;
