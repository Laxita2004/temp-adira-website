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
    category: "",
    tags: "",
    materialId: "",
    patternId: "",
    themeId: "",
    imageUrls: "",
  });

  interface DropdownItem {
    id: number;
    name: string;
  }

  const [materials, setMaterials] = useState<DropdownItem[]>([]);
  const [patterns, setPatterns] = useState<DropdownItem[]>([]);
  const [themes, setThemes] = useState<DropdownItem[]>([]);

  const [newMaterial, setNewMaterial] = useState("");
  const [newPattern, setNewPattern] = useState("");
  const [newTheme, setNewTheme] = useState("");
  const [newPatternImage, setNewPatternImage] = useState("");
  const [newThemeImage, setNewThemeImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [mats, pats, thms] = await Promise.all([
        fetch("/api/materials").then((res) => res.json()),
        fetch("/api/patterns").then((res) => res.json()),
        fetch("/api/themes").then((res) => res.json()),
      ]);
      setMaterials(mats);
      setPatterns(pats);
      setThemes(thms);
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddNew = async (type: "material" | "pattern" | "theme") => {
    const endpoint = `/api/${type}s`;

    const name =
      type === "material"
        ? newMaterial
        : type === "pattern"
        ? newPattern
        : newTheme;

    const image =
      type === "pattern"
        ? newPatternImage
        : type === "theme"
        ? newThemeImage
        : ""; // material doesn't need image

    if (!name.trim()) return;

    const body = type === "material" ? { name } : { name, imageUrl: image };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorResult = await res.json().catch(() => ({}));
        alert(errorResult.error || `Failed to add new ${type}`);
        return;
      }

      const result = await res.json();

      if (type === "material") {
        setMaterials((prev) => [...prev, result]);
        setForm((prev) => ({ ...prev, materialId: result.id.toString() }));
        setNewMaterial("");
      } else if (type === "pattern") {
        setPatterns((prev) => [...prev, result]);
        setForm((prev) => ({ ...prev, patternId: result.id.toString() }));
        setNewPattern("");
        setNewPatternImage(""); // clear input
      } else {
        setThemes((prev) => [...prev, result]);
        setForm((prev) => ({ ...prev, themeId: result.id.toString() }));
        setNewTheme("");
        setNewThemeImage(""); // clear input
      }
    } catch (err) {
      console.error("Error adding new entry:", err);
      alert(`Something went wrong while adding the ${type}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        inStock: parseInt(form.inStock),
        tags: form.tags.split(",").map((tag) => tag.trim()),
        materialId: parseInt(form.materialId),
        patternId: parseInt(form.patternId),
        themeId: parseInt(form.themeId),
        imageUrls: form.imageUrls.split(",").map((url) => url.trim()),
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Product added!");
      router.push("/admin/inventory");
    } else {
      alert(`Failed: ${result.error}`);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <input
          name="inStock"
          placeholder="In Stock"
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="imageUrls"
          placeholder="Image URLs (comma-separated)"
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />

        {/* Material Dropdown + Add New */}
        <div>
          <label className="block text-sm font-medium mb-1">Material</label>
          <select
            name="materialId"
            onChange={handleChange}
            className="w-full p-2 border"
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
              className="flex-1 p-2 border"
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
          <label className="block text-sm font-medium mb-1">Pattern</label>
          <select
            name="patternId"
            onChange={handleChange}
            className="w-full p-2 border"
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
              className="flex-1 p-2 border"
            />
            <input
              placeholder="Pattern Image URL"
              value={newPatternImage}
              onChange={(e) => setNewPatternImage(e.target.value)}
              className="flex-1 p-2 border"
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
          <label className="block text-sm font-medium mb-1">Theme</label>
          <select
            name="themeId"
            onChange={handleChange}
            className="w-full p-2 border"
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
              className="flex-1 p-2 border"
            />
            <input
              placeholder="Theme Image URL"
              value={newThemeImage}
              onChange={(e) => setNewThemeImage(e.target.value)}
              className="flex-1 p-2 border"
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

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
