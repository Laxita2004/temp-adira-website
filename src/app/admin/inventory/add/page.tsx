"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddProductPage = () => {
    const router = useRouter();

    const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    inStock: '',
    category: '',
    tags: '',
    materialId: '',
    patternId: '',
    themeId: '',
    imageUrls: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        inStock: parseInt(form.inStock),
        tags: form.tags.split(',').map(tag => tag.trim()),
        materialId: parseInt(form.materialId),
        patternId: parseInt(form.patternId),
        themeId: parseInt(form.themeId),
        imageUrls: form.imageUrls.split(',').map(url => url.trim()),
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Product added!');
      router.push('/admin/inventory');
    } else {
      alert(`Failed: ${result.error}`);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border" required />
        <input name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border" required />
        <input name="inStock" placeholder="In Stock" onChange={handleChange} className="w-full p-2 border" required />
        <input name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border" required />
        <input name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} className="w-full p-2 border" />
        <input name="materialId" placeholder="Material ID" onChange={handleChange} className="w-full p-2 border" required />
        <input name="patternId" placeholder="Pattern ID" onChange={handleChange} className="w-full p-2 border" required />
        <input name="themeId" placeholder="Theme ID" onChange={handleChange} className="w-full p-2 border" required />
        <input name="imageUrls" placeholder="Image URLs (comma-separated)" onChange={handleChange} className="w-full p-2 border" required />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
}

export default AddProductPage;