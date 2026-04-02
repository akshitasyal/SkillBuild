"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { Trash2, ShieldCheck, ShieldAlert, Search, UserPlus, MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data.users);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "suspended" : "active";
      await api.put(`/admin/user/status/${id}`, { status: newStatus });
      toast.success(`User ${newStatus === "active" ? "activated" : "suspended"} successfully`);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteUser = async (id) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await api.delete(`/admin/user/${id}`);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 mt-1">Manage all registered users and their permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1dbf73]/20 w-64 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#1dbf73]/10 text-[#1dbf73] flex items-center justify-center font-bold text-sm uppercase">
                        {user.username?.[0] || user.email[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.username || "Anonymous"}</p>
                        <p className="text-xs text-gray-500 font-medium">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${user.role === "admin" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${user.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStatusUpdate(user.id, user.status)}
                        className={`p-2 rounded-lg border border-gray-100 transition-all ${user.status === "active" ? "hover:bg-rose-50 hover:text-rose-600" : "hover:bg-emerald-50 hover:text-emerald-600 text-gray-400"
                          }`}
                        title={user.status === "active" ? "Suspend User" : "Activate User"}
                      >
                        {user.status === "active" ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 rounded-lg border border-gray-100 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 font-medium">
                    No users found matching your search.
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

export default AdminUsersPage;
