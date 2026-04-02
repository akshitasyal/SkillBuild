"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { Trash2, ExternalLink, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/admin/orders");
      setOrders(response.data.orders);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (confirm("Delete this order? Warning: This might cause issues for the buyer and seller. Only do this for fraudulent or erroneous orders.")) {
      try {
        await api.delete(`/admin/order/${id}`);
        toast.success("Order deleted successfully");
        fetchOrders();
      } catch (error) {
        toast.error("Failed to delete order");
      }
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toString().includes(searchTerm) || 
    order.buyer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.gig.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1dbf73]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Registry</h1>
          <p className="text-gray-500 mt-1">A global view of all transactions on the platform.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search orders..." 
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1dbf73]/20 w-64 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:bg-gray-50 transition-colors">
                <Filter size={20} />
            </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Gig Title</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <span className="font-mono text-xs text-gray-400 font-bold">#{order.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-gray-900">{order.buyer.username}</span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-700 max-w-xs truncate font-medium">{order.gig.title}</p>
                  </td>
                  <td className="px-6 py-5 font-bold text-gray-900">${order.price}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      order.isCompleted ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                    }`}>
                      {order.isCompleted ? "Completed" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500 font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all">
                        <ExternalLink size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteOrder(order.id)}
                        className="p-2 rounded-lg border border-gray-100 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500 font-medium font-bold">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
