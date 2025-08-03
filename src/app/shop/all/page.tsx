// app/shop/all/page.tsx
"use client"
import React from "react";
import AllSection from "@/components/shop/AllSection"; // adjust path if needed
import Header from "@/components/Header";
import FadeInSection from "@/components/FadeIn";
import Footer from "@/components/Footer";

const AllPage = () => {
  return (
    <>
      <Header />
      <div className="mt-20 bg-light">
        <FadeInSection>
          <AllSection />
        </FadeInSection>
      </div>
      <Footer />
    </>
  );
};

export default AllPage;
