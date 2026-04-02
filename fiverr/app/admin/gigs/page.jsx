"use client";

import React, { useEffect, useState } from "react";
import { GET_GIG_DATA, HOST, GET_USER_GIGS_ROUTE, DELETE_GIG_ROUTE } from "@/utils/constants";
import api from "@/utils/api";
import { Trash2, ExternalLink, Search, Filter, Tag } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const AdminGigsPage = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const response = await api.get("/admin/gigs");
      setGigs(response.data.gigs);
    } catch (error) {
      toast.error("Failed to fetch gigs");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGig = async (id) => {
    if (confirm("Delete this gig? This will also remove associated orders and reviews if they exist.")) {
      try {
        await api.delete(`/admin/gig/${id}`);
        toast.success("Gig deleted successfully");
        fetchGigs();
      } catch (error) {
        toast.error("Failed to delete gig");
      }
    }
  };

  const filteredGigs = gigs.filter(gig => 
    gig.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    gig.createdBy.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gig.category.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-800 font-bold">Gig Marketplace</h1>
          <p className="text-gray-500 mt-1 font-bold">Review and manage all service offerings on the platform.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search gigs..." 
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1dbf73]/20 w-64 text-sm font-bold"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:bg-gray-50 transition-colors font-bold">
                <Filter size={20} />
            </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 font-bold">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-bold">Gig Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-bold">Seller</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-bold">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-bold">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredGigs.map((gig) => (
                <tr key={gig.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                        <img 
                          src={gig.images?.[0] ? HOST + "/uploads/" + gig.images[0] : "https://images.fiverr.com/gigs/default.jpg"} 
                          alt="" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <p className="font-bold text-gray-900 text-sm max-w-[240px] truncate font-bold">{gig.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-gray-700 text-sm font-bold">{gig.createdBy.username}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full w-fit">
                      <Tag size={12} />
                      {gig.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-gray-900 font-bold">${gig.price}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 font-bold">
                      <Link 
                        href={`/gig/${gig.id}`}
                        className="p-2 rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all font-bold"
                        title="View Gig Details"
                      >
                         <ExternalLink size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDeleteGig(gig.id)}
                        className="p-2 rounded-lg border border-gray-100 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold"
                        title="Delete Gig"
                      >
                         <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredGigs.length === 0 && (
                <tr>
                   <td colSpan="5" className="px-6 py-10 text-center text-gray-500 font-bold">
                    No gigs found.
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

export default AdminGigsPage;
