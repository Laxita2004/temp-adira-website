"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface Product {
  id: number;
  title: string;
  price: number;
  inStock: number;
  images: { url: string }[];
  tags: string[];
}

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (res.status === 401) {
        alert("Please login first");
        return;
      }

      if (res.status === 403) {
        alert("You are not authorized to delete this product");
        return;
      }

      if (!res.ok) {
        alert(data?.error || "Failed to delete product");
        return;
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-light min-h-screen p-8">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="pt-[120px] flex justify-between items-center mb-6">
        <h1 className="text-gray-700 text-3xl font-bold">Inventory</h1>
        <Link
          href="/admin/inventory/add"
          className="bg-primary text-light px-4 py-2 rounded hover:bg-gray-800"
        >
          + Add New Product
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-700">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-700">No products available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-gray-700 p-3 border">Title</th>
                <th className="text-gray-700 p-3 border">Price</th>
                <th className="text-gray-700 p-3 border">Stock</th>
                <th className="text-gray-700 p-3 border">Tags</th>
                <th className="text-gray-700 p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="text-gray-600 p-3 border">{product.title}</td>
                  <td className="text-gray-600 p-3 border">₹{product.price}</td>
                  <td className="text-gray-600 p-3 border">
                    {product.inStock}
                  </td>
                  <td className="text-gray-600 p-3 border">
                    {product.tags?.join(", ") || "—"}
                  </td>
                  <td className="p-3 border space-x-2">
                    <Link
                      href={`/admin/inventory/edit/${product.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Inventory;
