"use client";

import React, { useState, useEffect } from "react";
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

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  availablePatterns: string[];
  availableMaterials: string[];
  availableCategories: string[];
  availableThemes: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  availablePatterns,
  availableMaterials,
  availableCategories,
  availableThemes,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    const fetchPatterns = async () => {
      const res = await fetch("/api/patterns");
      const data = await res.json();
      setPatterns(data);
    };

    fetchPatterns();
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      const res = await fetch("/api/materials");
      const data = await res.json();
      setMaterials(data);
    };

    fetchMaterials();
  }, []);

  useEffect(() => {
    const fetchThemes = async () => {
      const res = await fetch("/api/themes");
      const data = await res.json();
      setThemes(data);
    };

    fetchThemes();
  }, []);

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [selectedPattern, setSelectedPattern] = useState(
    searchParams.get("pattern") || ""
  );
  const [selectedMaterial, setSelectedMaterial] = useState(
    searchParams.get("material") || ""
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [selectedTheme, setSelectedTheme] = useState(
    searchParams.get("theme") || ""
  );
  const offerId = searchParams.get("offerId");

  useEffect(() => {
    if (!isOpen) return;

    setCategory(searchParams.get("category") || "");
    setSelectedPattern(searchParams.get("pattern") || "");
    setSelectedMaterial(searchParams.get("material") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSort(searchParams.get("sort") || "");
    setSelectedTheme(searchParams.get("theme") || "");
  }, [isOpen]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) params.set("category", category);
    else params.delete("category");

    if (selectedPattern) params.set("pattern", selectedPattern);
    else params.delete("pattern");

    if (selectedMaterial) params.set("material", selectedMaterial);
    else params.delete("material");

    if (selectedTheme) params.set("theme", selectedTheme);
    else params.delete("theme");

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    if (sort) params.set("sort", sort);
    else params.delete("sort");

    if (offerId) params.set("offerId", offerId);

    onClose();
    router.push(`?${params.toString()}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-light w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">Filter Products</h2>

        <div className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-[250px] bg-muted border rounded px-3 py-2"
            >
              <option value="">All</option>
              {availableCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Pattern */}
          <div>
            <label className="block text-sm font-medium mb-1">Pattern</label>
            <select
              value={selectedPattern}
              onChange={(e) => setSelectedPattern(e.target.value)}
              className="w-[250px] bg-muted border rounded px-3 py-2"
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
            <label className="block text-sm font-medium mb-1">Material</label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-[250px] bg-muted border rounded px-3 py-2"
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
            <label className="block text-sm font-medium mb-1">Collection</label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-[250px] bg-muted border rounded px-3 py-2"
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
              <label className="block text-sm font-medium mb-1">
                Min Price
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-muted border rounded px-3 py-2"
                placeholder="₹ min"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Max Price
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-muted border rounded px-3 py-2"
                placeholder="₹ max"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium mb-1">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-muted border rounded px-3 py-2"
            >
              <option value="">Recommended</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <button
            onClick={applyFilters}
            className="mt-6 w-full bg-primary text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
