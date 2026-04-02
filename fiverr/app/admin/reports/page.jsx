"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { BarChart3, PieChart, Activity, Download, TrendingUp } from "lucide-react";

const AdminReportsPage = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/admin/reports");
        setReports(response.data.reports);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <div className="container mx-auto px-6 py-20 text-center">Loading reports...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-fiverr-dark">Platform Reports</h1>
        <button className="btn-outline flex items-center gap-2">
           <Download size={18} />
           Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
         <div className="lg:col-span-2 bg-white p-8 rounded-lg border border-fiverr-border shadow-sm">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-fiverr-dark">
               <TrendingUp size={20} className="text-green-500" />
               Revenue Overview
            </h3>
            <div className="h-[300px] w-full bg-fiverr-light/30 rounded flex flex-col items-center justify-center text-fiverr-gray p-6">
               <div className="text-5xl font-bold text-fiverr-dark mb-4">${reports?.totalRevenue || 0}</div>
               <div className="text-sm">Total Platform Revenue from {reports?.totalOrders || 0} Completed Orders</div>
            </div>
         </div>
         <div className="bg-white p-8 rounded-lg border border-fiverr-border shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-fiverr-dark">Category Distribution</h3>
            <div className="space-y-4">
               {reports?.categoryStats && Object.entries(reports.categoryStats).length > 0 ? (
                 Object.entries(reports.categoryStats).map(([cat, count], i) => {
                   const percentage = reports.totalOrders > 0 ? Math.round((count / reports.totalOrders) * 100) : 0;
                   return (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm font-bold">
                           <span>{cat}</span>
                           <span>{percentage}% ({count})</span>
                        </div>
                        <div className="w-full h-2 bg-fiverr-light rounded-full overflow-hidden">
                           <div className="h-full bg-fiverr-green" style={{ width: `${percentage}%` }} />
                        </div>
                     </div>
                   );
                 })
               ) : (
                 <p className="text-fiverr-gray italic text-sm text-center py-10">No category data available</p>
               )}
            </div>
         </div>
      </div>

      <div className="bg-white p-8 rounded-lg border border-fiverr-border shadow-sm">
         <h3 className="text-xl font-bold mb-8 text-fiverr-dark">Key Performance Indicators</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
               <p className="text-fiverr-gray text-xs font-bold uppercase mb-2">Total Users</p>
               <h4 className="text-3xl font-bold text-fiverr-dark">{reports?.totalUsers || 0}</h4>
            </div>
            <div className="text-center">
               <p className="text-fiverr-gray text-xs font-bold uppercase mb-2">Avg. Order Value</p>
               <h4 className="text-3xl font-bold text-fiverr-dark">
                 ${reports?.totalOrders > 0 ? (reports.totalRevenue / reports.totalOrders).toFixed(2) : "0.00"}
               </h4>
            </div>
            <div className="text-center">
               <p className="text-fiverr-gray text-xs font-bold uppercase mb-2">Completed Orders</p>
               <h4 className="text-3xl font-bold text-fiverr-dark">{reports?.totalOrders || 0}</h4>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
