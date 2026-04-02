"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { 
  Shield, 
  Search, 
  User, 
  Globe, 
  Clock,
  Layout
} from "lucide-react";
import toast from "react-hot-toast";

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await api.get("/admin/logs");
      setLogs(response.data.logs);
    } catch (error) {
      toast.error("Failed to fetch system logs");
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    log.user.username?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ipAddress?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-bold">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-bold">System Login Logs</h1>
          <p className="text-gray-500 mt-1 font-bold">Monitor real-time login activity and security events.</p>
        </div>
        <div className="flex items-center gap-3 font-bold">
            <div className="relative font-bold">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search logs..." 
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1dbf73]/20 w-64 text-sm font-bold"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button 
                onClick={fetchLogs}
                className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-bold"
                title="Refresh logs"
            >
                <Clock size={20} />
            </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-bold">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-bold">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 font-bold">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-bold">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-bold">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-bold">Login Time</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-bold">IP Address</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-bold">Total Logins</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-bold">
              {filteredLogs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">
                            <User size={16} />
                        </div>
                        <span className="font-bold text-gray-900 font-bold">{log.user.username || "System"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-600 font-medium font-bold">{log.email}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col font-bold">
                        <span className="text-sm font-bold text-gray-800 font-bold">{new Date(log.loginTime).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-400 font-bold">{new Date(log.loginTime).toLocaleTimeString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium font-bold">
                        <Globe size={14} className="text-gray-300 font-bold" />
                        {log.ipAddress || "::1"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 font-bold">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-bold font-bold">
                            {log.loginCount}
                        </span>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 font-bold font-medium font-bold">
                    No system logs found.
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

export default AdminLogsPage;
