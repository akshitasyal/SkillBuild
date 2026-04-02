"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { 
  Users, 
  Briefcase, 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, revenueRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/revenue-stats")
        ]);
        setStats(statsRes.data.stats);
        setRevenueData(revenueRes.data.revenueStats);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1dbf73]"></div>
      </div>
    );
  }

  const cards = [
    { 
      title: "Total Users", 
      value: stats?.totalUsers || 0, 
      icon: <Users size={24} className="text-blue-600" />, 
      color: "bg-blue-50",
      trend: "+12%",
      trendUp: true
    },
    { 
      title: "Total Gigs", 
      value: stats?.totalGigs || 0, 
      icon: <Briefcase size={24} className="text-emerald-600" />, 
      color: "bg-emerald-50",
      trend: "+5%",
      trendUp: true
    },
    { 
      title: "Total Orders", 
      value: stats?.totalOrders || 0, 
      icon: <ShoppingBag size={24} className="text-orange-600" />, 
      color: "bg-orange-50",
      trend: "-2%",
      trendUp: false
    },
    { 
      title: "Total Revenue", 
      value: `$${stats?.revenue?.toLocaleString() || 0}`, 
      icon: <TrendingUp size={24} className="text-purple-600" />, 
      color: "bg-purple-50",
      trend: "+18%",
      trendUp: true
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.color}`}>
                {card.icon}
              </div>
              <div className={`flex items-center text-sm font-medium ${card.trendUp ? "text-emerald-600" : "text-rose-600"}`}>
                {card.trend}
                {card.trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Revenue Analytics</h3>
              <p className="text-sm text-gray-500">Weekly revenue performance overview</p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#1dbf73]/20">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1dbf73" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1dbf73" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 12}}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1dbf73" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
