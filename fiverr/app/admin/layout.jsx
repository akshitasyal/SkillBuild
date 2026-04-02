"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Briefcase, 
  DollarSign, 
  LogOut,
  Download
} from "lucide-react";
import api from "@/utils/api";
import toast from "react-hot-toast";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const [stats, setStats] = useState({
     totalUsers: 0,
     totalGigs: 0,
     totalOrders: 0,
     revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/stats");
        setStats(response.data.stats);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      }
    };
    fetchStats();
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Users", href: "/admin/users", icon: <Users size={20} />, count: stats.totalUsers },
    { name: "Orders", href: "/admin/orders", icon: <ShoppingBag size={20} />, count: stats.totalOrders },
    { name: "Gigs", href: "/admin/gigs", icon: <Briefcase size={20} />, count: stats.totalGigs },
    { name: "Revenue", href: "/admin/revenue", icon: <DollarSign size={20} /> },
    { name: "Export Data", href: "#", icon: <Download size={20} />, action: "export" },
  ];

  const handleExport = async () => {
    const toastId = toast.loading("Preparing your export...");
    try {
      const response = await api.get("/admin/export", { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Fiverr_Admin_Data_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Data export completed successfully!", { id: toastId });
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e2329] text-white flex flex-col shadow-xl z-20 transition-all duration-300">
        <div className="p-6 border-b border-gray-700 flex items-center gap-3">
          <div className="bg-[#1dbf73] p-1.5 rounded-md">
            <LayoutDashboard className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Admin</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.name}>
                {item.action === "export" ? (
                    <button
                        onClick={handleExport}
                        className="w-full flex items-center justify-between p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all group cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400 group-hover:text-[#1dbf73] transition-colors">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </div>
                    </button>
                ) : (
                    <Link
                        href={item.href}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all group ${
                            pathname === item.href 
                            ? "bg-[#1dbf73] text-white shadow-lg shadow-[#1dbf73]/20" 
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`${pathname === item.href ? "text-white" : "text-gray-400 group-hover:text-[#1dbf73]"} transition-colors`}>{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </div>
                        {item.count !== undefined && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                pathname === item.href ? "bg-white text-[#1dbf73]" : "bg-gray-700 text-gray-300"
                            }`}>
                                {item.count}
                            </span>
                        )}
                    </Link>
                )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
           <Link href="/logout" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all w-full">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 relative">
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
