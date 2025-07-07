// src/components/admin/AdminHeader.tsx
"use client";

type Props = {
  setSidebarOpen: (open: boolean) => void;
};

const AdminHeader = ({ setSidebarOpen }: Props) => (
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
);

export default AdminHeader;
