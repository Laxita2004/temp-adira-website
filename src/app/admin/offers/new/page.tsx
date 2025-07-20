"use client";

import { useState } from "react";
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
  });
  const [banner, setBanner] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });
    if (banner) formData.append("banner", banner);

    await fetch("/api/sales", {
      method: "POST",
      body: formData,
    });

    router.push("/admin/sales");
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
            placeholder="E.g. Monsoon Madness Sale"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Short description about the sale..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Discount Type & Value */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Discount Type</label>
            <select
              value={form.discountType}
              onChange={(e) => setForm({ ...form, discountType: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="PERCENTAGE">Percentage (%)</option>
              <option value="FLAT">Flat ₹</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Discount Value</label>
            <input
              type="number"
              placeholder="E.g. 20"
              value={form.discountValue}
              onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        {/* Start and End Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Start Date & Time</label>
            <input
              type="datetime-local"
              value={form.startsAt}
              onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">End Date & Time</label>
            <input
              type="datetime-local"
              value={form.endsAt}
              onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        {/* Banner Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload Banner</label>
          <input
            type="file"
            onChange={(e) => setBanner(e.target.files?.[0] || null)}
            className="w-full border px-4 py-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-xl transition"
        >
          ➕ Add Sale
        </button>
      </form>
    </div>
  );
}
