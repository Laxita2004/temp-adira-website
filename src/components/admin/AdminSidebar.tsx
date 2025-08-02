// src/components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

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
        <Link href="/admin/admin-portal-unguessable-0581d2602l2409s0731j/inventory" onClick={() => setSidebarOpen(false)} className="hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Manage Inventory
        </Link>
        <Link href="/admin/admin-portal-unguessable-0581d2602l2409s0731j/orders/placed" onClick={() => setSidebarOpen(false)} className="hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Orders Placed
        </Link>
        <Link href="/admin/admin-portal-unguessable-0581d2602l2409s0731j/orders/history" onClick={() => setSidebarOpen(false)} className="hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Order History
        </Link>
        <Link href="/admin/admin-portal-unguessable-0581d2602l2409s0731j/profile" onClick={() => setSidebarOpen(false)} className="hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Edit User Info
        </Link>
        <Link href="/admin/admin-portal-unguessable-0581d2602l2409s0731j/offers" onClick={() => setSidebarOpen(false)} className="hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Offers Management
        </Link>
        <Link href="/admin/admin-portal-unguessable-0581d2602l2409s0731j/sales" onClick={() => setSidebarOpen(false)} className="hover:bg-secondary px-4 py-2 rounded hover:text-primary transition duration-300">
          Sales Dashboard
        </Link>
      </nav>
    </aside>
  </>
);

export default AdminSidebar;