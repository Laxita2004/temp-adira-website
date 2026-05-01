'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const product = await res.json();

        setForm({
          title: product.title,
          description: product.description,
          price: product.price,
          inStock: product.inStock,
          category: product.category,
          tags: product.tags.join(', '),
          materialId: product.materialId.toString(),
          patternId: product.patternId.toString(),
          themeId: product.themeId.toString(),
          imageUrls: product.images.map((img: { url: string }) => img.url).join(', '),
        });

        setLoading(false);
      } catch (err) {
        console.error('Failed to load product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        inStock: parseInt(form.inStock),
        tags: form.tags.split(',').map((t) => t.trim()),
        materialId: parseInt(form.materialId),
        patternId: parseInt(form.patternId),
        themeId: parseInt(form.themeId),
        imageUrls: form.imageUrls.split(',').map((url) => url.trim()),
      }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (res.ok) {
      alert('✅ Product updated!');
      router.push('/admin/inventory');
    } else {
      alert(`❌ Error: ${data?.error || 'Unknown error'}`);
    }
  } catch (err) {
    console.error("Submission failed:", err);
    alert("❌ Failed to update product.");
  }
};


  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex">
      {/* <AdminSidebar /> */}
      <div className="flex-1">
        {/* <AdminHeader setSidebarOpen={() => {}}/> */}
        <div className="pt-6 p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border" required />
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border" required />
            <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full p-2 border" required />
            <input name="inStock" type="number" value={form.inStock} onChange={handleChange} className="w-full p-2 border" required />
            <input name="category" value={form.category} onChange={handleChange} className="w-full p-2 border" required />
            <input name="tags" value={form.tags} onChange={handleChange} className="w-full p-2 border" placeholder="Comma-separated tags" />
            <input name="materialId" value={form.materialId} onChange={handleChange} className="w-full p-2 border" placeholder="Material ID" required />
            <input name="patternId" value={form.patternId} onChange={handleChange} className="w-full p-2 border" placeholder="Pattern ID" required />
            <input name="themeId" value={form.themeId} onChange={handleChange} className="w-full p-2 border" placeholder="Theme ID" required />
            <input name="imageUrls" value={form.imageUrls} onChange={handleChange} className="w-full p-2 border" placeholder="Comma-separated image URLs" required />
            <button type="submit" className="bg-primary text-light px-4 py-2 rounded hover:bg-gray-800">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
