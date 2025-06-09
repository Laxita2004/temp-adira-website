// app/shop/all/page.tsx

import React from "react";
import AllSection from "@/components/shop/AllSection"; // adjust path if needed
import Header from "@/components/Header";
import FadeInSection from "@/components/FadeIn";

const AllPage = () => {
  return (
    <div className="mt-20 bg-light">
        <FadeInSection>
            <AllSection />
        </FadeInSection>
        
    </div>
    
  )
};

export default AllPage;
