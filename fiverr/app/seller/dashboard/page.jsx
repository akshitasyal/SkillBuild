"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { DollarSign, Briefcase, Eye, Star } from "lucide-react";
import { useStateProvider } from "@/context/StateContext";

const SellerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [{ userInfo }] = useStateProvider();
  const user = userInfo;

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await api.get("/dashboard/seller");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch seller dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSellerData();
  }, []);

  if (loading) return <div className="container mx-auto px-6 py-20 text-center">Loading dashboard...</div>;

  const stats = [
    { title: "Earnings (Jan)", value: `$${data?.revenue || 0}`, icon: <DollarSign className="text-green-500" />, desc: "Net Earnings" },
    { title: "Active Orders", value: data?.ordersCount || 0, icon: <Briefcase className="text-blue-500" />, desc: "Currently Working" },
    { title: "Gig Views", value: "1.2k", icon: <Eye className="text-purple-500" />, desc: "Total Impressions" },
    { title: "Seller Rating", value: "5.0", icon: <Star className="text-orange-500" />, desc: "(48 reviews)" },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 rounded-full bg-fiverr-light overflow-hidden border border-fiverr-border">
           <img src={user?.profileImage || "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/06d7411/google2x.06d7411.png"} alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-fiverr-dark">Welcome back, {user?.username}</h1>
          <p className="text-fiverr-gray text-sm font-semibold">Ready to handle some more orders today?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-lg border border-fiverr-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
               {stat.icon}
               <span className="text-[10px] font-bold text-fiverr-gray uppercase">{stat.desc}</span>
            </div>
            <p className="text-fiverr-gray text-xs font-bold uppercase mb-1">{stat.title}</p>
            <h3 className="text-3xl font-bold text-fiverr-dark">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-fiverr-border shadow-sm overflow-hidden">
         <div className="p-6 border-b border-fiverr-border flex justify-between items-center bg-zinc-50/50">
            <h3 className="font-bold text-fiverr-dark uppercase text-sm tracking-wider">Active Orders</h3>
            <button className="text-xs font-bold text-fiverr-green hover:underline">View All</button>
         </div>
         <div className="p-12 text-center text-fiverr-gray italic text-sm">
            Check your <a href="/seller/orders" className="text-fiverr-green hover:underline not-italic font-bold">Orders Page</a> for detailed active project management.
         </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
