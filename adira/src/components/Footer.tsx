"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-light text-gray-800 pt-12 mt-[50px]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Logo + Description */}
        <div>
          <img src="/AdiraLogo.png" alt="Adira Logo" className="h-[150px] mb-4" />
          <p className="text-sm">
            A little description about the brand including theme, caption, aim
            etc.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <Link href="https://www.instagram.com" target="_blank">
              <FaInstagram className="text-2xl text-primary hover:scale-110 transition" />
            </Link>
            <Link href="https://www.facebook.com" target="_blank">
              <FaFacebookF className="text-2xl text-primary hover:scale-110 transition" />
            </Link>
            <Link href="https://wa.me/1234567890" target="_blank">
              <FaWhatsapp className="text-2xl text-primary hover:scale-110 transition" />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <FaSquareThreads className="text-2xl text-primary hover:scale-110 transition" />
            </Link>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-primary mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/terms">Terms & Policy</Link>
            </li>
            <li>
              <Link href="/care">Saree Care Guide</Link>
            </li>
          </ul>
        </div>

        {/* Right: Account Links */}
        <div>
          <h4 className="text-xl font-semibold text-primary mb-4">
            My Account
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/login">Sign In</Link>
            </li>
            <li>
              <Link href="/track">Track Your Order</Link>
            </li>
            <li>
              <Link href="/cart">Go To Cart</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-primary text-white text-center text-sm mt-10 py-3">
        Copyright © {new Date().getFullYear()} Adira | The House of Chiffon. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
