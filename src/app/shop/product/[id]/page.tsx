"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  images: { id: number; imageUrl: string }[];
}

const ProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        if (data.images?.length > 0) {
          setSelectedImage(data.images[0].imageUrl);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  if (!product) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-12 bg-light mt-[120px]">
        <div className="flex flex-col md:flex-row gap-10 bg-light">
          <div className="w-full md:w-1/2">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full rounded-xl shadow"
            />
            <div className="flex gap-2 mt-4">
              {product.images.map((img) => (
                <img
                  key={img.id}
                  src={img.imageUrl}
                  alt="thumb"
                  onClick={() => setSelectedImage(img.imageUrl)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                    selectedImage === img.imageUrl
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-xl text-green-700">₹{product.price}</p>
            <p>{product.description}</p>

            <div className="space-y-4 mt-6">
              <p className="text-md text-gray-700">
                <strong>How to Order:</strong>
                <br />
                Take a screenshot, or simply share this product link via
                WhatsApp, Instagram, or Facebook.
                <br />
                We'll help you place your order!
                <br/>
                <em>Please bear with us while our full website is under development!</em>
              </p>

              <div className="flex gap-4">
                <a
                  href={`https://wa.me/917000785499?text=Hi!-I'm-interested-in-this-product:-${window?.location?.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-md"
                >
                  DM us on WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/adirachiffons?igsh=N2FxaDBidHVpeTcx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-md"
                >
                  DM us on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
