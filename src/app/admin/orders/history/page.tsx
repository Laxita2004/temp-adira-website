"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import OrderCard from "@/components/admin/OrderCard";

const OrderHistoryPage = () => {
  type Order = {
    id: number;
    userEmail: string;
    total: string;
    status: string;
    createdAt: string;
    user: {
      name: string;
      email: string;
    };
    items: {
      quantity: number;
      price: string;
      product: {
        title: string;
        images: { url: string }[];
      };
    }[];
    payment?: {
      amount: string;
      status: string;
      provider: string;
    };
  };

  const [orders, setOrders] = useState<Order[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/admin/orders/history");
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 min-h-screen bg-gray-100 pl-64">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="pt-[120px] p-6">
          <h2 className="text-primary text-2xl font-bold mb-4">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No past orders found.</p>
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
