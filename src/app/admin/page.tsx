"use client";

import Link from "next/link";
import { useState } from "react";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 text-xl font-bold text-primary">Admin Menu</div>
        <nav className="flex flex-col gap-2 p-4 pt-[50px]">
          <Link
            href="/admin/inventory"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-gray-200 px-4 py-2 rounded hover:text-primary transition duration-300"
          >
            Manage Inventory
          </Link>
          <Link
            href="/admin/orders"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-gray-200 px-4 py-2 rounded hover:text-primary transition duration-300"
          >
            Orders Placed
          </Link>
          <Link
            href="/admin/history"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-gray-200 px-4 py-2 rounded hover:text-primary transition duration-300"
          >
            Order History
          </Link>
          <Link
            href="/admin/confirm"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-gray-200 px-4 py-2 rounded hover:text-primary transition duration-300"
          >
            Confirm Orders
          </Link>
          <Link
            href="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-gray-200 px-4 py-2 rounded hover:text-primary transition duration-300"
          >
            Edit User Info
          </Link>
          <Link
            href="/admin/sales"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-gray-200 px-4 py-2 rounded hover:text-primary transition duration-300"
          >
            Sales Dashboard
          </Link>
        </nav>
      </aside>

      {/* HEADER */}
      <header
        className="bg-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50"
        style={{ height: "100px" }}
      >
        <div className="relative flex items-center justify-between pt-[20px]">
          {/* MENU BUTTON */}
          <button
            className="text-primary font-semibold text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-[120px] px-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Admin!</h2>
        <p>Select an option from the menu to begin.</p>
      </main>
    </div>
  );
};

export default AdminPanel;
