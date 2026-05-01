"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type Props = {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
};

const AdminHeader = ({ setSidebarOpen, sidebarOpen }: Props) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50 h-[100px]">
      <div className="relative flex items-center justify-between pt-[20px]">
        {/* MENU BUTTON */}
        <button
          className="text-primary text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        {/* CENTER TITLE */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-primary font-bold text-xl">
          Admin Dashboard
        </h1>

        {/* PROFILE SECTION */}
        <div className="relative" ref={dropdownRef}>
          {/* PROFILE ICON */}
          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            title="Admin Profile"
          >
            <User size={20} />
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md overflow-hidden">
              {/* Edit Profile */}
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/admin/profile");
                }}
                className="w-full text-left px-4 py-2 hover:bg-secondary text-primary"
              >
                Edit Profile
              </button>

              {/* Logout */}
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full text-left px-4 py-2 hover:bg-secondary text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
