"use client";

import Header from "../../components/Header";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

export default function Contact() {
  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ backgroundImage: "url('/contact/contactbg.png')" }}
        />

        {/* Grey Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center  justify-center min-h-screen text-light text-center px-4">
          <div className="bg-light/20 rounded-md backdrop-blur-md shadow-xl px-10 py-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Let’s Connect
            </h1>
            <p className="max-w-xl mb-6 text-sm md:text-base text-muted">
              We'd love to hear from you! Whether you have a question about our
              products, need help with an order, or just want to say hello—feel
              free to reach out.
              <br />
              You can message us directly on WhatsApp or Instagram .
              <br />
              We're here to assist you every step of the way.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-lg md:text-xl">
              <a
                href="http://chat.whatsapp.com/HIm4x09TqlPE4gDgMStdZW"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <FaWhatsapp /> WhatsApp
              </a>
              <a
                href="https://www.instagram.com/ratnawadofficial?igsh=d3g0NDFmcmY5cjlx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <FaInstagram /> Instagram
              </a>
              <a
                href="https://wa.me/917000785499"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <FiPhone /> +91 70007 85499
              </a>
              <a
                href="https://www.facebook.com/dharmnishtha.singh.thakur?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <FaFacebook /> Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
