"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            href="/shop"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Shop
          </Link>
          <Link
            href="/about"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-2 rounded hover:bg-muted hover:text-primary hover:translate-x-1 transition duration-300"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-2 rounded hover:bg-muted hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Contact
          </Link>
          <Link
            href="/orders"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-2 rounded hover:bg-muted hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Track Your Order
          </Link>
        </nav>
      </aside>

      <header className="bg-light px-6 py-4 shadow-md fixed  top-0 left-0 w-full z-50"
      style={{ height: "100px" }}>
        <div className="relative flex items-center justify-between pt-[20px]">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              className="text-primary font-semibold text-2xl"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
          </div>

          {/* CENTER */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <img src="/AdiraLogo.png" alt="Logo" className="h-20 w-auto" />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <Link href="/login" className="text-primary font-semibold">
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="text-primary font-semibold"
                >
                  Profile
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-muted"
                    >
                      Edit Profile
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 hover:bg-muted"
                    >
                      Wishlist
                    </Link>
                    <Link
                      href="/cart"
                      className="block px-4 py-2 hover:bg-muted"
                    >
                      Cart
                    </Link>
                    <button
                      onClick={() => {
                        setIsLoggedIn(false); // replace with actual logout
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-muted"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
