"use client";

import { useStateProvider } from "@/context/StateContext";
import { GET_SELLER_DASHBOARD_DATA, HOST } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Skeleton from "@/components/Skeleton";

function Index() {
    const [{ userInfo }] = useStateProvider();
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState(undefined);

    useEffect(() => {
        const getSellerDashboardData = async () => {
            try {
                const response = await axios.get(GET_SELLER_DASHBOARD_DATA, {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setDashboardData(response.data.dashboardData);
                }
            } catch (err) {
                console.error("Failed to fetch seller dashboard data:", err);
            }
        };
        if (userInfo) {
            getSellerDashboardData();
        }
    }, [userInfo]);

    return (
        <div className="min-h-screen bg-[#f7f7f7]">
            {userInfo && (
                <div className="fiverr-container py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Profile Section */}
                        <div className="lg:w-[350px] flex-shrink-0">
                            <div className="bg-white border border-[#dadbdd] p-8 shadow-sm h-max flex flex-col items-center gap-6">
                                <div className="relative group">
                                    {userInfo?.imageName ? (
                                        <div className="relative h-32 w-32 rounded-full overflow-hidden border border-[#dadbdd]">
                                            <Image
                                                src={userInfo.imageName}
                                                alt="Profile"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-purple-600 h-32 w-32 flex items-center justify-center rounded-full text-white text-5xl font-bold shadow-inner">
                                            {userInfo.email?.[0].toUpperCase()}
                                        </div>
                                    )}
                                    <div className="absolute bottom-1 right-3 h-5 w-5 bg-[#1dbf73] border-2 border-white rounded-full"></div>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-[#404145] mb-1">{userInfo.username}</h2>
                                    <div className="flex items-center justify-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <svg key={i} className="w-3 h-3 text-[#ffbe5b]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        ))}
                                        <span className="text-[#404145] text-xs font-bold ml-1">5.0</span>
                                    </div>
                                </div>
                                <div className="w-full pt-6 border-t border-[#dadbdd] flex flex-col gap-4">
                                    <div className="flex justify-between items-center text-[14px]">
                                        <span className="text-[#62646a]">Response Rate</span>
                                        <span className="text-[#404145] font-bold">100%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[14px]">
                                        <span className="text-[#62646a]">Delivered on Time</span>
                                        <span className="text-[#404145] font-bold">100%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[14px]">
                                        <span className="text-[#62646a]">Order Completion</span>
                                        <span className="text-[#404145] font-bold">100%</span>
                                    </div>
                                </div>
                                <div className="w-full pt-6 border-t border-[#dadbdd]">
                                     <div className="flex justify-between items-center mb-1">
                                         <span className="text-[#404145] font-bold text-sm">Earned in March</span>
                                         <span className="text-[#404145] font-bold text-sm">$0</span>
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {dashboardData === undefined ? (
                                    [1, 2, 3].map((i) => (
                                        <div key={i} className="bg-white border border-[#dadbdd] p-8 shadow-sm flex flex-col gap-4">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-10 w-16" />
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <div 
                                            className="bg-white border border-[#dadbdd] p-8 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                            onClick={() => router.push("/seller/gigs")}
                                        >
                                            <span className="text-[#62646a] font-bold text-xs uppercase tracking-wider mb-2 block">Total Gigs</span>
                                            <h3 className="text-4xl font-bold text-[#404145] group-hover:text-fiverr-green transition-colors">
                                                {dashboardData?.gigs || 0}
                                            </h3>
                                        </div>
                                        <div 
                                            className="bg-white border border-[#dadbdd] p-8 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                            onClick={() => router.push("/seller/orders")}
                                        >
                                            <span className="text-[#62646a] font-bold text-xs uppercase tracking-wider mb-2 block">Active Orders</span>
                                            <h3 className="text-4xl font-bold text-[#404145] group-hover:text-fiverr-green transition-colors">
                                                {dashboardData?.orders || 0}
                                            </h3>
                                        </div>
                                        <div 
                                            className="bg-white border border-[#dadbdd] p-8 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                            onClick={() => router.push("/seller/unread-messages")}
                                        >
                                            <span className="text-[#62646a] font-bold text-xs uppercase tracking-wider mb-2 block">Unread Messages</span>
                                            <h3 className="text-4xl font-bold text-[#404145] group-hover:text-fiverr-green transition-colors">
                                                {dashboardData?.unreadMessages || 0}
                                            </h3>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="bg-white border border-[#dadbdd] shadow-sm">
                                <div className="p-6 border-b border-[#dadbdd] flex justify-between items-center">
                                    <h2 className="text-lg font-bold text-[#404145]">Earnings Overview</h2>
                                    <span className="text-sm font-bold text-fiverr-green cursor-pointer hover:underline">View Details</span>
                                </div>
                                {dashboardData === undefined ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-[#dadbdd]">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="p-8 flex flex-col gap-4">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-8 w-20" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-[#dadbdd]">
                                        <div className="p-8">
                                            <span className="text-[#62646a] font-bold text-xs uppercase tracking-wider mb-3 block">Daily Revenue</span>
                                            <h3 className="text-3xl font-bold text-[#404145]">${dashboardData?.dailyRevenue || 0}</h3>
                                        </div>
                                        <div className="p-8">
                                            <span className="text-[#62646a] font-bold text-xs uppercase tracking-wider mb-3 block">Monthly Revenue</span>
                                            <h3 className="text-3xl font-bold text-[#404145]">${dashboardData?.monthlyRevenue || 0}</h3>
                                        </div>
                                        <div className="p-8">
                                            <span className="text-[#62646a] font-bold text-xs uppercase tracking-wider mb-3 block">Yearly Revenue</span>
                                            <h3 className="text-3xl font-bold text-[#404145]">${dashboardData?.revenue || 0}</h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Index;
