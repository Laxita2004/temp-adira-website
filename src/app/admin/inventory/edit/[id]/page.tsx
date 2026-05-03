"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    inStock: "",
    tags: "",
    categoryId: "",
    materialId: "",
    patternId: "",
    themeId: "",
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [product, mats, pats, thms, cats] = await Promise.all([
          fetch(`/api/products/${id}`).then((res) => res.json()),
          fetch("/api/materials").then((res) => res.json()),
          fetch("/api/patterns").then((res) => res.json()),
          fetch("/api/themes").then((res) => res.json()),
          fetch("/api/categories").then((res) => res.json()),
        ]);

        setMaterials(mats);
        setPatterns(pats);
        setThemes(thms);
        setCategories(cats);

        setForm({
          title: product.title,
          description: product.description,
          price: product.price.toString(),
          inStock: product.inStock.toString(),
          categoryId: product.categoryId.toString(),
          tags: product.tags.join(", "),
          materialId: product.materialId.toString(),
          patternId: product.patternId.toString(),
          themeId: product.themeId.toString(),
          imageUrls: product.images
            .map((img: { url: string }) => img.url)
            .join(", "),
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          inStock: parseInt(form.inStock),
          tags: form.tags.split(",").map((t) => t.trim()),
          materialId: parseInt(form.materialId),
          patternId: parseInt(form.patternId),
          themeId: parseInt(form.themeId),
          imageUrls: form.imageUrls.split(",").map((url) => url.trim()),
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok) {
        alert("Product updated!");
        router.push("/admin/inventory");
      } else {
        alert(`Error: ${data?.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to update product.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-light flex">
      <div className="flex-1">
        <div className="pt-6 p-6 max-w-3xl mx-auto">
          <h2 className="text-primary text-2xl font-bold mb-6">Edit Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-600 block text-sm font-medium mb-1">
                Title
              </label>
            <input
              name="title"
              value={form.title}
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
              value={form.description}
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
              type="number"
              value={form.price}
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
              type="number"
              value={form.inStock}
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              required
            />
            </div>
            <div>
              <label className="text-gray-600 block text-sm font-medium mb-1">
                Image URLs
              </label>
            <input
              name="imageUrls"
              value={form.imageUrls}
              onChange={handleChange}
              className="text-gray-600 w-full p-2 border"
              placeholder="Comma-separated image URLs"
              required
            />
            </div>
            <div>
              <label className="text-gray-600 block text-sm font-medium mb-1">
                Category
              </label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="text-gray-600 w-full p-2 border"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-600 block text-sm font-medium mb-1">
                Material
              </label>
              <select
                name="materialId"
                value={form.materialId}
                onChange={handleChange}
                className="text-gray-600 w-full p-2 border"
                required
              >
                <option value="">Select Material</option>
                {materials.map((mat) => (
                  <option key={mat.id} value={mat.id}>
                    {mat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-600 block text-sm font-medium mb-1">
                Pattern
              </label>
              <select
                name="patternId"
                value={form.patternId}
                onChange={handleChange}
                className="text-gray-600 w-full p-2 border"
                required
              >
                <option value="">Select Pattern</option>
                {patterns.map((pat) => (
                  <option key={pat.id} value={pat.id}>
                    {pat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-600 block text-sm font-medium mb-1">
                Theme
              </label>
              <select
                name="themeId"
                value={form.themeId}
                onChange={handleChange}
                className="text-gray-600 w-full p-2 border"
                required
              >
                <option value="">Select Theme</option>
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-primary text-light px-4 py-2 rounded hover:bg-gray-800"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
