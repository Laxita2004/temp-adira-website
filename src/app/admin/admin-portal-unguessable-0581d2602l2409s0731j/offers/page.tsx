"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

type Offer = {
  id: number;
  title: string;
  description: string;
  discountValue: number;
  discountType: "PERCENTAGE" | "FLAT";
  bannerUrl?: string;
};

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/offers/active`)
      .then((res) => res.json())
      .then(setOffers);
  }, []);

  const deleteOffer = async (id: number) => {
    await fetch(`api/offers/${id}`, {
      method: "DELETE",
    });
    setOffers((prev) => prev.filter((offer) => offer.id !== id));
  };

  return (
    <div className="p-6">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <AdminHeader setSidebarOpen={setSidebarOpen} />
      <div className="flex justify-between items-center pt-[120px] ">
        <h1 className="text-xl font-semibold">Offers</h1>
        <Link
          href="/admin/offers/new"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          + New Offer
        </Link>
      </div>

      <div className="mt-6 space-y-4">
         {offers.map((offer) => (
          <div key={offer.id} className="p-4 border rounded shadow-sm">
            <h2 className="font-bold">{offer.title}</h2>
            <p>{offer.description}</p>
            <p>
              Discount: {offer.discountValue} ({offer.discountType})
            </p>
            {offer.bannerUrl && (
              <img src={offer.bannerUrl} alt="banner" className="w-60 mt-2 rounded" />
            )}
            <div className="mt-2 flex gap-4">
              <Link href={`/admin/offers/edit/${offer.id}`} className="text-blue-500">Edit</Link>
              <button onClick={() => deleteOffer(offer.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}