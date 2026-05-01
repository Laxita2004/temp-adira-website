"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddOffers() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    startsAt: "",
    endsAt: "",
    bannerUrl: "",
    productIds: [] as number[],
  });
  const [products, setProducts] = useState<{ id: number; title: string; price: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  useEffect(() => {
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    // Only keep id, title, and price
    const minimalProducts = data.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
    }));

    setProducts(minimalProducts);
  };

  fetchProducts();
}, []);

  const handleProductToggle = (id: number) => {
    setForm((prev) => {
      const alreadySelected = prev.productIds.includes(id);
      return {
        ...prev,
        productIds: alreadySelected
          ? prev.productIds.filter((pid) => pid !== id)
          : [...prev.productIds, id],
      };
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const id = parseInt(e.target.value);
  if (e.target.checked) {
    setSelectedProductIds([...selectedProductIds, id]);
  } else {
    setSelectedProductIds(selectedProductIds.filter((pid) => pid !== id));
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          bannerUrl: form.bannerUrl,
          discountType: form.discountType,
          discountValue: parseFloat(form.discountValue),
          startsAt: form.startsAt,
          endsAt: form.endsAt,
          productIds: form.productIds,
          description: form.description,
        }),
      });

      if (res.ok) {
        alert("Offer created successfully!");
        router.push("/admin/admin-portal-unguessable-0581d2602l2409s0731j/offers");
      } else {
        alert("Failed to create offer");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">🎉 Create New Offer</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="e.g. Diwali Dhamaka Sale"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            value={form.description}
            placeholder="Write a paragraph to describe the sale"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg h-24 resize-none"
          />
        </div>

        {/* Discount Type & Value */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Discount Type</label>
            <select
              value={form.discountType}
              onChange={(e) => setForm({ ...form, discountType: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="PERCENTAGE">Percentage (%)</option>
              <option value="FLAT">Flat ₹</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Discount Value</label>
            <input
              type="number"
              value={form.discountValue}
              onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Start Date & Time</label>
            <input
              type="datetime-local"
              value={form.startsAt}
              onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">End Date & Time</label>
            <input
              type="datetime-local"
              value={form.endsAt}
              onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* Banner URL */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Banner Image URL</label>
          <input
            type="text"
            placeholder="https://example.com/banner.png"
            value={form.bannerUrl}
            onChange={(e) => setForm({ ...form, bannerUrl: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Product Selection */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Select Products</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto border rounded-lg p-3">
            {products.map((product) => (
  <div key={product.id} className="flex items-center space-x-2">
    <input
      type="checkbox"
      id={`product-${product.id}`}
      value={product.id}
      onChange={handleCheckboxChange}
    />
    <label htmlFor={`product-${product.id}`}>
      {product.title} — ₹{product.price}
    </label>
  </div>
))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:secondary text-white py-3 rounded-xl text-lg font-semibold"
        >
          {loading ? "Creating Offer..." : "Add Sale"}
        </button>
      </form>
    </div>
  );
}