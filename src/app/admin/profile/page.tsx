"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminEditUserInfo = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {

    // At least one field should be filled
    if (!name && !newEmail && !password) {
      setMessage("Please provide at least one field to update.");
      return;
    }

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          newEmail,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Admin info updated successfully.");

        // clear fields after success
        setPassword("");
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
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="pt-[120px] p-6 max-w-xl mx-auto">
          <h2 className="text-primary text-2xl font-bold mb-4">
            Edit Admin Info
          </h2>

          {message && (
            <p className="mb-4 text-sm text-red-500">{message}</p>
          )}

          {/* Name */}
          <label className="text-gray-700 block mb-2 font-medium">
            New Name
          </label>
          <input
            className="w-full mb-4 px-4 py-2 border rounded"
            type="text"
            placeholder="New Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <label className="text-gray-700 block mb-2 font-medium">
            New Email (optional)
          </label>
          <input
            className="w-full mb-4 px-4 py-2 border rounded"
            type="email"
            placeholder="admin@adira.in"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />

          {/* Password */}
          <label className="text-gray-700 block mb-2 font-medium">
            New Password (optional)
          </label>
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