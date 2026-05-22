// src/components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: Props) => (
  <>
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-light shadow-lg z-40 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 text-xl font-bold text-primary">Admin Menu</div>
      <nav className="flex flex-col gap-2 p-4 pt-[50px]">
        <Link href="/admin/inventory" onClick={() => setSidebarOpen(false)} className="text-primary hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Manage Inventory
        </Link>
        <Link href="/admin/orders/placed" onClick={() => setSidebarOpen(false)} className="text-primary hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Orders Placed
        </Link>
        <Link href="/admin/orders/history" onClick={() => setSidebarOpen(false)} className="text-primary hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Order History
        </Link>
        <Link href="/admin/offers" onClick={() => setSidebarOpen(false)} className="text-primary hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Offers Management
        </Link>
        <Link href="/admin/sales" onClick={() => setSidebarOpen(false)} className="text-primary hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Sales Dashboard
        </Link>
      </nav>
    </aside>
  </>
);

export default AdminSidebar;