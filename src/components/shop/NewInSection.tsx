"use client";

import React from "react";

const NewInSection = () => {
  return (
    <section className="py-16 px-4 " id="new-in-section">

      <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            NEW IN
          </h2>
          <div className="w-16 h-1 mt-2 bg-primary rounded-full"></div>
        </div>
        {/* Optional link/button */}
        <button className="text-sm text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Logo block */}
        <div className=" flex justify-center items-center rounded-xl col-span-1 md:col-span-1">
          <img src="https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="saree" 
          className="w-full h-60 object-cover shadow rounded-xl" />
        </div>

        {/* Product Image */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1691030256392-b17be2b3e9e9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="saree"
            className="w-full h-60 object-cover"
          />
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1609748340041-f5d61e061ebc?q=80&w=1009&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="saree"
            className="w-full h-60 object-cover"
          />
        </div>

        {/* Business Cards / Shirt */}
        <div className="bg-white shadow rounded-xl overflow-hidden col-span-1 md:col-span-2">
          <img
            src="https://plus.unsplash.com/premium_photo-1664303775888-6bc50a8d13a6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Promo"
            className="w-full h-60 object-cover"
          />
        </div>

        <div className=" flex justify-center items-center rounded-xl col-span-1 md:col-span-1">
          <img src="https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="saree" 
          className="w-full h-60 object-cover shadow rounded-xl" />
        </div>
        
      </div>
    </section>
  );
};

export default NewInSection;
