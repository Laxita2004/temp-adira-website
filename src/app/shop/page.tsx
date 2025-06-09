"use client";

import TopBar from "@/components/shop/TopBar";
import FadeInSection from "@/components/FadeIn";
import BestSeller from "@/components/shop/BestSeller";
import SalesSection from "@/components/shop/SaleSection";
import NewInSection from "@/components/shop/NewInSection";

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

      <FadeInSection>
        <SalesSection />
      </FadeInSection>

      <FadeInSection>
        <NewInSection />
      </FadeInSection>
    </div>
  );
};

export default shop;
