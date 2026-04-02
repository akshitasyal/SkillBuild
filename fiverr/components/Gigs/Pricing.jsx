"use client";
import React, { useState } from "react";
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/navigation";
function Pricing() {
    const [{ gigData, userInfo }, dispatch] = useStateProvider();
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState("Basic");

    const tabs = ["Basic", "Standard", "Premium"];

    // Mock data for other tiers since backend provides only one
    const getTabData = (tab) => {
        if (tab === "Basic") return { 
            name: "SILVER - PKG", 
            price: gigData.price, 
            delivery: gigData.deliveryTime, 
            revisions: gigData.revisions,
            desc: gigData.shortDesc 
        };
        if (tab === "Standard") return { 
            name: "GOLD - PKG", 
            price: Math.round(gigData.price * 1.5), 
            delivery: Math.max(1, gigData.deliveryTime - 1), 
            revisions: gigData.revisions + 2,
            desc: "Enhanced version of the service with more features and faster delivery." 
        };
        return { 
            name: "PLATINUM - PKG", 
            price: Math.round(gigData.price * 2.5), 
            delivery: Math.max(1, gigData.deliveryTime - 2), 
            revisions: "Unlimited",
            desc: "The ultimate package with all features included and priority support." 
        };
    };

    const currentTabData = gigData ? getTabData(selectedTab) : null;

    return (
        <div className="sticky top-24 mb-10 w-full max-w-[450px] ml-auto">
            {gigData && (
                <div className="border border-fiverr-border bg-white rounded-sm shadow-sm overflow-hidden flex flex-col">
                    {/* Tabs */}
                    <div className="flex border-b border-fiverr-border">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`flex-1 py-4 text-sm font-bold transition-all text-center ${
                                    selectedTab === tab
                                        ? "text-fiverr-green border-b-2 border-fiverr-green bg-white"
                                        : "text-[#74767e] bg-[#fafafa] hover:bg-white"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-8 flex flex-col gap-6">
                        <div className="flex justify-between items-start gap-4">
                            <h4 className="text-base font-bold text-[#404145] uppercase">
                                {currentTabData.name}
                            </h4>
                            <h6 className="font-bold text-2xl text-[#404145]">${currentTabData.price}</h6>
                        </div>
                        
                        <p className="text-[#62646a] text-sm leading-relaxed">
                            {currentTabData.desc}
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="text-[#62646a] font-bold text-sm flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <FiClock className="text-lg" />
                                    <span>{currentTabData.delivery} Day Delivery</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiRefreshCcw className="text-lg" />
                                    <span>{currentTabData.revisions} Revisions</span>
                                </div>
                            </div>

                            <ul className="flex flex-col gap-2">
                                {gigData.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <BsCheckLg className={`text-base shrink-0 ${selectedTab === "Basic" ? "text-gray-300" : "text-[#1dbf73]"}`} />
                                        <span className="text-[#95979d] text-sm font-medium">{feature}</span>
                                    </li>
                                ))}
                                {/* Mock features for better visual match */}
                                <li className="flex items-center gap-2">
                                    <BsCheckLg className="text-[#1dbf73] text-base shrink-0" />
                                    <span className="text-[#404145] text-sm font-medium">Sound design & mixing</span>
                                </li>
                                <li className="flex items-center gap-2">
                                     <BsCheckLg className="text-[#95979d] text-base shrink-0" />
                                     <span className="text-[#95979d] text-sm font-medium">Motion graphics</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            {userInfo?.id === gigData?.userId ? (
                                <button
                                    className="w-full py-3 bg-[#1dbf73] text-white font-bold rounded-md hover:bg-[#19a463] transition-all text-[15px] flex items-center justify-center gap-2"
                                    onClick={() => router.push(`/seller/gigs/${gigData.id}`)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit Your Gig
                                </button>
                            ) : (
                                <button
                                    className="w-full py-3 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-all text-[15px]"
                                    onClick={() => router.push(`/checkout?gigId=${gigData.id}&tier=${selectedTab}`)}
                                >
                                    Request to order
                                </button>
                            )}
                            {userInfo?.id !== gigData?.userId && (
                                <button
                                    className="w-full py-3 border border-fiverr-dark text-fiverr-dark font-bold rounded-md hover:bg-fiverr-dark hover:text-white transition-all text-[15px]"
                                >
                                    Contact me
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pricing;