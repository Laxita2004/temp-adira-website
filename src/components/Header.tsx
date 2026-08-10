"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { User, ShoppingCart } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <>
      {/* OVERLAY */}
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
        <div className="p-4 text-primary font-bold text-xl">Menu</div>
        <nav className="flex flex-col gap-2 p-4 pt-[50px]">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="text-primary hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/shop/all"
            onClick={() => setSidebarOpen(false)}
            className="text-primary hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Shop All Products
          </Link>
          <Link
            href="/shop?section=bestseller"
            onClick={() => setSidebarOpen(false)}
            className="text-primary hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Best Sellers
          </Link>
          <Link
            href="/shop?section=sale"
            onClick={() => setSidebarOpen(false)}
            className="text-primary hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Sale
          </Link>
          <Link
            href="/shop/all?pattern=jaal%20work"
            onClick={() => setSidebarOpen(false)}
            className="text-primary hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Jaal Work
          </Link>
          <Link
            href="/shop/all?pattern=scattered%20motifs%20(buta%20work)"
            onClick={() => setSidebarOpen(false)}
            className="text-primary hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Scattered Motifs (Khulla buta work)
          </Link>
          <Link
            href="/shop/all?pattern=statement%20border"
            onClick={() => setSidebarOpen(false)}
            className="text-primary hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Statement Borders
          </Link>
          <Link
            href="/about"
            onClick={() => setSidebarOpen(false)}
            className="text-primary hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setSidebarOpen(false)}
            className="text-primary px-4 py-2 rounded hover:bg-muted hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Get in Touch
          </Link>
        </nav>
      </aside>

      <header
        className="bg-light px-6 py-4 shadow-md fixed  top-0 left-0 w-full z-50"
        style={{ height: "100px" }}
      >
        <div className="relative flex items-center justify-between pt-[20px]">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              className="text-primary font-semibold text-2xl"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              ☰
            </button>
          </div>

          {/* CENTER */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <img
                src="/logo/RatnawadLogo.png"
                alt="Logo"
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 relative z-50">
            {status === "loading" ? null : user ? (
              <>
                {/* CART ICON */}
                <Link href="/cart">
                  <div className="relative group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-80 transition">
                      <ShoppingCart size={20} />
                    </div>

                    {/* Hover label */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-primary text-light px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      Cart
                    </span>
                  </div>
                </Link>

                {/* PROFILE */}
                <div ref={dropdownRef} className="relative">
                  <div className="relative group">
                    <button
                      onClick={() => setProfileOpen((prev) => !prev)}
                      className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-80 transition"
                    >
                      <User size={20} />
                    </button>

                    {/* Hover label */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-primary text-light px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      Profile
                    </span>
                  </div>

                  {/* DROPDOWN */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-light border shadow-lg rounded-md overflow-hidden">
                      <Link
                        href="/profile"
                        className="text-gray-600 block px-4 py-2 hover:bg-muted"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Profile
                      </Link>

                      <Link
                        href="/orders"
                        className="text-gray-600 block px-4 py-2 hover:bg-muted"
                        onClick={() => setProfileOpen(false)}
                      >
                        Order History
                      </Link>

                      <Link
                        href="/help"
                        className="text-gray-600 block px-4 py-2 hover:bg-muted"
                        onClick={() => setProfileOpen(false)}
                      >
                        Get Help
                      </Link>

                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-muted text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
