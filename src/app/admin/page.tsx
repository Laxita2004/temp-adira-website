"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-light">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="pt-[120px] px-6 text-gray-900">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Admin!</h2>
        <p>Select an option from the menu to begin.</p>
      </main>
    </div>
  );
};

export default AdminPanel;
