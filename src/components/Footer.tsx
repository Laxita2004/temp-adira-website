"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-light text-gray-800 pt-12 mt-[50px]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Logo + Description */}
        <div>
          <img
            src="/logo/AdiraLogo.png"
            alt="Adira Logo"
            className="h-[150px] mb-4"
          />
          <p className="text-sm">
            Preserving heritage with a modern touch. We bring you the finest,
            most luxurious fabrics of India, woven with tradition and styled for
            today.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <Link href="https://www.instagram.com/adirachiffons?igsh=N2FxaDBidHVpeTcx" target="_blank">
              <FaInstagram className="text-2xl text-primary hover:scale-110 transition" />
            </Link>
            <Link href="https://www.facebook.com/dharmnishtha.singh.thakur?mibextid=ZbWKwL" target="_blank">
              <FaFacebookF className="text-2xl text-primary hover:scale-110 transition" />
            </Link>
            <Link href="http://chat.whatsapp.com/HIm4x09TqlPE4gDgMStdZW" target="_blank">
              <FaWhatsapp className="text-2xl text-primary hover:scale-110 transition" />
            </Link>
            <Link href="https://www.threads.com/@adirachiffons" target="_blank">
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
              <Link href="/shop/all">Shop</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/terms&policy">Terms & Policy</Link>
            </li>
            <li>
              <Link href="/care">Saree Care Guide</Link>
            </li>
          </ul>
        </div>

        {/* Right: Account Links */}
        {/* <div>
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
        </div> */}
        <div>
          <h4 className="text-xl font-semibold text-primary mb-4">
            Popular Categories
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shop?tag=partywear">Party Wear Sarees</Link>
            </li>
            <li>
              <Link href="/shop?material=chiffon">Chiffon Collection</Link>
            </li>
            <li>
              <Link href="/shop?tag=bestseller">Bestsellers</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-primary text-white text-center text-sm mt-10 py-3">
        Copyright © {new Date().getFullYear()} Adira | The House of Chiffon. All
        Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
