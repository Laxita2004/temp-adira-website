"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
// import { useRouter } from "next/router";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  inStock: number;
  images: { url: string }[];
  tags: string[];
}

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
//   const router = useRouter();
const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
        const res = await fetch("/api/__");
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
        const res = await fetch(`api/___`, {
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
    <div className="p-8">
       <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <AdminHeader setSidebarOpen={setSidebarOpen} />
      <div className="pt-[120px] flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Link
          href="/admin/inventory/add"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Add New Product
        </Link>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Stock</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Tags</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="p-3 border">{product.title}</td>
                  <td className="p-3 border">₹{product.price}</td>
                  <td className="p-3 border">{product.inStock}</td>
                  <td className="p-3 border">{product.category}</td>
                  <td className="p-3 border">
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
