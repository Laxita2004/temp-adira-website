"use client";

import TopBar from "@/components/shop/TopBar";
import FadeInSection from "@/components/FadeIn";
import BestSeller from "@/components/shop/BestSeller";

const shop = () => {
  return (
    <div className="bg-light min-h-screen flex flex-col">
      <FadeInSection>
        <div className="flex justify-center mt-[150px]">
          <TopBar />
        </div>
      </FadeInSection>

      <FadeInSection>
        <BestSeller />
      </FadeInSection>
    </div>
  );
};

export default shop;
