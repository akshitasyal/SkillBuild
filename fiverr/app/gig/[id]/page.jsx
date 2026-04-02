"use client"
import React, { useEffect } from "react";
import Pricing from "@/components/Gigs/Pricing";
import Details from "@/components/Gigs/Details";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  CHECK_USER_ORDERED_GIG_ROUTE,
  GET_GIG_DATA,
} from "@/utils/constants";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function Gig() {
  const params = useParams();
  const id = params.id;
  const [{ gigData, userInfo }, dispatch] = useStateProvider();
  useEffect(() => {
    dispatch({ type: reducerCases.SET_GIG_DATA, gigData: undefined });
  }, [dispatch]);
  useEffect(() => {
    const fetchGigData = async () => {
      try {
        const {
          data: { gig },
        } = await axios.get(`${GET_GIG_DATA}/${id}`);
        dispatch({ type: reducerCases.SET_GIG_DATA, gigData: gig });
      } catch (err) {
        console.log(err);
      }
    };
    if (id) fetchGigData();
  }, [id, dispatch]);

  useEffect(() => {
    const checkGigOrdered = async () => {
      const {
        data: { hasUserOrderedGig },
      } = await axios.get(`${CHECK_USER_ORDERED_GIG_ROUTE}/${id}`, {
        withCredentials: true,
      });
      dispatch({
        type: reducerCases.HAS_USER_ORDERED_GIG,
        hasOrdered: hasUserOrderedGig,
      });
    };
    if (userInfo) {
      checkGigOrdered();
    }
  }, [dispatch, id, userInfo]);

  return (
    <div className="bg-white min-h-[80vh] pb-24 relative">
      <div className="fiverr-container pt-8 max-w-[1300px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <Details />
          </div>
          <div className="lg:col-span-4 relative">
            <Pricing />
          </div>
        </div>
      </div>

      {/* Floating UI Elements from Screenshot */}
      {/* 1. Message Seller Bubble (Bottom Left) */}
      <div className="fixed bottom-10 left-10 z-40 hidden md:flex items-center gap-3 bg-white p-2 pr-6 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
               {gigData?.createdBy?.profileImage ? (
                   <Image src={HOST + "/" + gigData.createdBy.profileImage} alt="" fill className="object-cover" />
               ) : (
                   <div className="bg-fiverr-gray w-full h-full flex items-center justify-center text-white font-bold">{gigData?.createdBy?.email?.[0]}</div>
               )}
               <div className="absolute bottom-0 right-1 h-2.5 w-2.5 bg-[#1dbf73] border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col">
              <span className="text-xs font-bold text-[#404145]">Message {gigData?.createdBy?.fullName || "Seller"}</span>
              <span className="text-[10px] text-[#74767e]">Online • Avg. response time: 1 hour</span>
          </div>
      </div>

      {/* 2. Floating Chat Button (Bottom Right) */}
      <div className="fixed bottom-10 right-10 z-50">
          <button className="h-14 w-14 bg-[#1dbf73] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#19a463] transition-all hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </button>
      </div>
    </div>
  );
}

export default Gig;