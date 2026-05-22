"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AddProductPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    inStock: "",
    categoryId: "",
    materialId: "",
    patternId: "",
    themeId: "",
    tags: "",
    imageUrls: "",
  });

  interface DropdownItem {
    id: number;
    name: string;
  }

  const [categories, setCategories] = useState<DropdownItem[]>([]);
  const [materials, setMaterials] = useState<DropdownItem[]>([]);
  const [patterns, setPatterns] = useState<DropdownItem[]>([]);
  const [themes, setThemes] = useState<DropdownItem[]>([]);

  const [newCategory, setNewCategory] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [newPattern, setNewPattern] = useState("");
  const [newTheme, setNewTheme] = useState("");
  const [newPatternImage, setNewPatternImage] = useState("");
  const [newThemeImage, setNewThemeImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [mats, pats, thms, cats] = await Promise.all([
        fetch("/api/materials").then((res) => res.json()),
        fetch("/api/patterns").then((res) => res.json()),
        fetch("/api/themes").then((res) => res.json()),
        fetch("/api/categories").then((res) => res.json()),
      ]);

      setMaterials(mats);
      setPatterns(pats);
      setThemes(thms);
      setCategories(cats);
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddNew = async (
    type: "category" | "material" | "pattern" | "theme",
  ) => {
    const endpointMap = {
      category: "/api/categories",
      material: "/api/materials",
      pattern: "/api/patterns",
      theme: "/api/themes",
    };

    const endpoint = endpointMap[type];

    const name =
      type === "material"
        ? newMaterial
        : type === "pattern"
          ? newPattern
          : type === "theme"
            ? newTheme
            : newCategory;

    const image =
      type === "pattern"
        ? newPatternImage
        : type === "theme"
          ? newThemeImage
          : "";

    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    const body =
      type === "category" || type === "material"
        ? { name }
        : { name, imageUrl: image };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let result = null;
      try {
        result = await res.json();
      } catch {}

      if (res.status === 401) {
        alert("Please login first");
        return;
      }

      if (res.status === 403) {
        alert("You are not authorized to perform this action");
        return;
      }

      if (!res.ok) {
        alert(result?.error || `Failed to add new ${type}`);
        return;
      }

      if (type === "category") {
        setCategories((prev) => [...prev, result]);
        setForm((prev) => ({ ...prev, categoryId: result.id.toString() }));
        setNewCategory("");
      } else if (type === "material") {
        setMaterials((prev) => [...prev, result]);
        setForm((prev) => ({ ...prev, materialId: result.id.toString() }));
        setNewMaterial("");
      } else if (type === "pattern") {
        setPatterns((prev) => [...prev, result]);
        setForm((prev) => ({ ...prev, patternId: result.id.toString() }));
        setNewPattern("");
        setNewPatternImage("");
      } else {
        setThemes((prev) => [...prev, result]);
        setForm((prev) => ({ ...prev, themeId: result.id.toString() }));
        setNewTheme("");
        setNewThemeImage("");
      }
    } catch (err) {
      console.error("Error adding new entry:", err);
      alert(`Something went wrong while adding the ${type}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isNaN(parseFloat(form.price))) {
        alert("Invalid price");
        return;
      }

      if (isNaN(parseInt(form.inStock))) {
        alert("Invalid stock value");
        return;
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          inStock: parseInt(form.inStock),
          tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()) : [],
          categoryId: parseInt(form.categoryId),
          materialId: parseInt(form.materialId),
          patternId: parseInt(form.patternId),
          themeId: parseInt(form.themeId),
          imageUrls: form.imageUrls
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean),
        }),
      });

      let result = null;
      try {
        result = await response.json();
      } catch {}

      // Handle auth errors explicitly
      if (response.status === 401) {
        alert("Please login first");
        return;
      }

      if (response.status === 403) {
        alert("You are not authorized to add products");
        return;
      }

      // Other failures
      if (!response.ok) {
        alert(result?.error || "Failed to add product");
        return;
      }

      // Success
      alert("Product added!");
      router.push("/admin/inventory");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-light">
      <div className="bp-6 max-w-xl mx-auto">
        <h2 className="text-primary text-xl font-semibold mb-4">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-600 block text-sm font-medium mb-1">
              Title
            </label>
            <input
              name="title"
              placeholder="Title"
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="text-gray-600 block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="text-gray-600 block text-sm font-medium mb-1">
              Price
            </label>
            <input
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="text-gray-600 block text-sm font-medium mb-1">
              Stock
            </label>
            <input
              name="inStock"
              placeholder="In Stock"
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="text-gray-600 block text-sm font-medium mb-1">
              Tags
            </label>
            <input
              name="tags"
              placeholder="Tags (comma-separated)"
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
            />
          </div>
          <div>
            <label className="text-gray-600 block text-sm font-medium mb-1">
              Image URLs
            </label>
            <input
              name="imageUrls"
              placeholder="Image URLs (comma-separated)"
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              required
            />
          </div>

          {/* Category Dropdown + Add New */}
          <div>
            <label className="text-gray-600 block text-sm font-medium mb-1">
              Category
            </label>
            <select
              name="categoryId"
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              required
              value={form.categoryId}
            >
              <option value="">Select Category</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2 mt-1">
              <input
                placeholder="New category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="text-gray-600 flex-1 p-2 border"
              />
              <button
                type="button"
                onClick={() => handleAddNew("category")}
                className="bg-gray-700 text-white px-3 py-2 rounded"
              >
                + Add
              </button>
            </div>
          </div>
          {/* Material Dropdown + Add New */}
          <div>
            <label className="text-gray-600 block text-sm font-medium mb-1">
              Material
            </label>
            <select
              name="materialId"
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              required
              value={form.materialId}
            >
              <option value="">Select Material</option>
              {materials.map((mat: any) => (
                <option key={mat.id} value={mat.id}>
                  {mat.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2 mt-1">
              <input
                placeholder="New material"
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                className="text-gray-600 flex-1 p-2 border"
              />
              <button
                type="button"
                onClick={() => handleAddNew("material")}
                className="bg-gray-700 text-white px-3 py-2 rounded"
              >
                + Add
              </button>
            </div>
          </div>
          {/* Pattern Dropdown + Add New */}
          <div>
            <label className="text-gray-600 block text-sm font-medium mb-1">
              Pattern
            </label>
            <select
              name="patternId"
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              required
              value={form.patternId}
            >
              <option value="">Select Pattern</option>
              {patterns.map((pat: any) => (
                <option key={pat.id} value={pat.id}>
                  {pat.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2 mt-1">
              <input
                placeholder="New pattern"
                value={newPattern}
                onChange={(e) => setNewPattern(e.target.value)}
                className="text-gray-600 flex-1 p-2 border"
              />
              <input
                placeholder="Pattern Image URL"
                value={newPatternImage}
                onChange={(e) => setNewPatternImage(e.target.value)}
                className="text-gray-600 flex-1 p-2 border"
              />
              <button
                type="button"
                onClick={() => handleAddNew("pattern")}
                className="bg-gray-700 text-white px-3 py-2 rounded"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Theme Dropdown + Add New */}
          <div>
            <label className="text-gray-600 block text-sm font-medium mb-1">
              Theme
            </label>
            <select
              name="themeId"
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              required
              value={form.themeId}
            >
              <option value="">Select Theme</option>
              {themes.map((theme: any) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2 mt-1">
              <input
                placeholder="New theme"
                value={newTheme}
                onChange={(e) => setNewTheme(e.target.value)}
                className="text-gray-600 flex-1 p-2 border"
              />
              <input
                placeholder="Theme Image URL"
                value={newThemeImage}
                onChange={(e) => setNewThemeImage(e.target.value)}
                className="text-gray-600 flex-1 p-2 border"
              />
              <button
                type="button"
                onClick={() => handleAddNew("theme")}
                className="bg-gray-700 text-white px-3 py-2 rounded"
              >
                + Add
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
