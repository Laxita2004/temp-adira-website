"use client";

import Link from "next/link";
import { useState } from "react";
import { MdOutlineNotificationImportant } from "react-icons/md";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNote, setShowNote] = useState(false);

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
            className="hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/shop/all"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Shop All Products
          </Link>
          <Link
            href="/shop"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Best Sellers
          </Link>
          <Link
            href="/shop"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Sale
          </Link>
          <Link
            href="/shop"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            New In
          </Link>
          <Link
            href="/shop/all?pattern=jaal%20work"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Jaal Work
          </Link>
          <Link
            href="/shop/all?pattern=statement%border"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Statement Borders
          </Link>
          <Link
            href="/shop/all?pattern=printed%chiffons"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted px-4 py-2 rounded hover:text-primary hover:translate-x-1 transition duration-300"
          >
            Printed Chiffons
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
              <img src="/logo/AdiraLogo.png" alt="Logo" className="h-20 w-auto" />
            </Link>
          </div>

          {/* RIGHT — Notification Tooltip */}
          <div className="flex items-center gap-4 relative z-50">
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => setShowNote(true)}
              onMouseLeave={() => setShowNote(false)}
            >
              <MdOutlineNotificationImportant className="text-2xl text-primary" />

              {showNote && (
                <div className="absolute top-10 right-0 w-72 text-lg bg-primary/90 backdrop-blur-md border border-light shadow-lg rounded p-3 text-light z-50 animate-fadeIn">
                  <strong>This is our temporary website!</strong>
                  <p className="mt-1">
                    Many of you were asking where you can view our full catalog.
                    While the original website is under development, here’s a
                    temporary version with our collections, catalog, and more!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
