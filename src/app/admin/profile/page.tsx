"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminEditUserInfo = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [email, setEmail] = useState(""); // current email (primary key)
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState(""); // optional
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    if (!email || !name) {
      setMessage("Name and current email are required.");
      return;
    }

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, newEmail, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Admin info updated successfully.");
      } else {
        setMessage(data.error || "Update failed.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 min-h-screen bg-gray-100 pl-64">
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <div className="pt-[120px] p-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Edit Admin Info</h2>

          {message && <p className="mb-4 text-sm text-red-500">{message}</p>}

          <label className="block mb-2 font-medium">Current Email</label>
          <input
            className="w-full mb-4 px-4 py-2 border rounded"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2 font-medium">New Name</label>
          <input
            className="w-full mb-4 px-4 py-2 border rounded"
            type="text"
            placeholder="New Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block mb-2 font-medium">New Email (optional)</label>
          <input
            className="w-full mb-4 px-4 py-2 border rounded"
            type="email"
            placeholder="admin@adira.in"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />

          <label className="block mb-2 font-medium">New Password (optional)</label>
          <input
            className="w-full mb-6 px-4 py-2 border rounded"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-80 transition"
            onClick={handleUpdate}
          >
            Update Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditUserInfo;
