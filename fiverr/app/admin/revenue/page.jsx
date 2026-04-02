"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  Download
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import toast from "react-hot-toast";

const AdminRevenuePage = () => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleExport = async () => {
    const toastId = toast.loading("Preparing your revenue report...");
    try {
      const response = await api.get("/admin/export", { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Fiverr_Revenue_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Revenue report downloaded successfully!", { id: toastId });
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to download report. Please try again.", { id: toastId });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, revenueRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/revenue-stats")
      ]);
      setStats(statsRes.data.stats);
      setRevenueData(revenueRes.data.revenueStats);
    } catch (error) {
      toast.error("Failed to fetch revenue data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1dbf73]"></div>
      </div>
    );
  }

  const totalRevenue = stats?.revenue || 0;
  const avgOrderValue = totalRevenue / (stats?.totalOrders || 1);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-bold">Revenue Insights</h1>
          <p className="text-gray-500 mt-1 font-bold">Track earnings, growth and transaction performance.</p>
        </div>
        <button 
            onClick={handleExport}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 font-bold shadow-sm"
        >
            <Download size={18} />
            Download Report
        </button>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                    <DollarSign className="text-emerald-600" size={24} />
                </div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider font-bold">Total Revenue</p>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 font-bold">${totalRevenue.toLocaleString()}</h3>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold mt-2 font-bold">
                <ArrowUpRight size={16} />
                <span>+12.5% from last month</span>
            </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                    <TrendingUp className="text-blue-600" size={24} />
                </div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider font-bold">Avg. Order Value</p>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 font-bold">${avgOrderValue.toFixed(2)}</h3>
            <div className="flex items-center gap-1 text-blue-600 text-sm font-bold mt-2 font-bold">
                <ArrowUpRight size={16} />
                <span>+4.2% from last month</span>
            </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                    <Calendar className="text-purple-600" size={24} />
                </div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider font-bold">Active Subscriptions</p>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 font-bold">84</h3>
            <div className="flex items-center gap-1 text-purple-600 text-sm font-bold mt-2 font-bold">
                <ArrowUpRight size={16} />
                <span>+8 new this week</span>
            </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-gray-800 font-bold">Weekly Performance</h3>
              <p className="text-sm text-gray-500 font-bold">Real-time revenue tracking for the past 7 days</p>
            </div>
        </div>

        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 13, fontWeight: 500}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 13, fontWeight: 500}}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                />
                <Bar 
                  dataKey="revenue" 
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                >
                  {revenueData.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={index === revenueData.length - 1 ? "#1dbf73" : "#e5e7eb"} 
                        className="transition-all duration-300 hover:fill-[#1dbf73]/80 cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenuePage;
