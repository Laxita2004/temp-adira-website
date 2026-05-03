"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface Product {
  id: number;
  title: string;
  price: string;
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
        const data = await res.json();
        setProducts(data);
    } catch (err) {
        console.error("Failed to fetch products", err);
    } finally {
        setLoading(false);
    }
  };


  const handleDelete = async (id : number) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });

        if(res.ok) {
            setProducts(products.filter((p) => p.id !== id));
        } else {
            alert("Failed to delete product")
        }
    } catch (err) {
        console.error("Error deleting product:", err);
    }
  }

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
                  <td className="text-gray-600 p-3 border">{product.inStock}</td>
                  <td className="text-gray-600 p-3 border">
                    {product.tags.join(", ") || "—"}
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
