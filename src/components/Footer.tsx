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
            src="/logo/RatnawadLogo.png"
            alt="Adira Logo"
            className="h-[150px] mb-4"
          />
          <p className="text-sm">
            The most beautiful things take time. Our sarees are thoughtfully
            designed, crafted with exceptional fabrics and brought to life by
            skilled Indian artisans. Rooted in slow fashion, we create timeless
            pieces meant to be worn, cherished and passed down through
            generations.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <Link
              href="https://www.instagram.com/ratnawadofficial?igsh=d3g0NDFmcmY5cjlx"
              target="_blank"
            >
              <FaInstagram className="text-2xl text-primary hover:scale-110 transition" />
            </Link>
            <Link
              href="https://www.facebook.com/dharmnishtha.singh.thakur?mibextid=ZbWKwL"
              target="_blank"
            >
              <FaFacebookF className="text-2xl text-primary hover:scale-110 transition" />
            </Link>
            <Link
              href="http://chat.whatsapp.com/HIm4x09TqlPE4gDgMStdZW"
              target="_blank"
            >
              <FaWhatsapp className="text-2xl text-primary hover:scale-110 transition" />
            </Link>
            <Link
              href="https://www.threads.com/@ratnawadofficial"
              target="_blank"
            >
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

        <div>
          <h4 className="text-xl font-semibold text-primary mb-4">
            Popular Categories
          </h4>
          <ul className="space-y-2 text-sm">
            
            <li>
              <Link href="">Ratnawad Originals</Link>
            </li>
            <li>
              <Link href="/shop/?section=bestseller">Bestsellers</Link>
            </li>
            <li>
              <Link href="/shop?section=sale">Sale</Link>
            </li>
            <li>
              <Link href="/shop/?section=new-in">New Collection</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-primary text-white text-center text-sm mt-10 py-3">
        Copyright © {new Date().getFullYear()} RATNAWAD. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
