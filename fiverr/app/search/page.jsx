"use client";

import SearchGridItem from "@/components/Search/SearchGridItem";
import { SEARCH_GIGS_ROUTE } from "@/utils/constants";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";

function Search() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  
  const [gigs, setGigs] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      setGigs(undefined); // Reset for skeleton trigger
      try {
        const {
          data: { gigs },
        } = await axios.get(
          `${SEARCH_GIGS_ROUTE}?searchTerm=${q || ""}&category=${category || ""}`
        );
        setGigs(gigs);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [category, q]);

  return (
    <div className="fiverr-container mb-24 min-h-[70vh]">
      {(q || category) && (
        <h3 className="text-3xl md:text-4xl my-10 font-bold text-[#404145]">
          {category ? category : <>Results for <span className="italic">"{q}"</span></>}
        </h3>
      )}
      
      <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {["Category", "Service Options", "Seller Details", "Budget", "Delivery Time"].map((filter) => (
          <button 
            key={filter}
            className="py-2 px-4 border border-[#dadbdd] rounded-md font-bold text-[#404145] hover:border-black transition-all text-sm whitespace-nowrap flex items-center gap-2"
          >
            {filter}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-8">
          <span className="text-[#74767e] font-bold text-sm">
            {gigs !== undefined ? `${gigs.length} services available` : "Finding services..."}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[#74767e] font-semibold text-sm">Sort by:</span>
            <span className="text-[#404145] font-bold text-sm cursor-pointer flex items-center gap-1">
              Relevance
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>
        </div>

        {gigs === undefined ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="aspect-[16/10] w-full" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <div className="mt-4 flex flex-col gap-2">
                   <Skeleton className="h-3 w-12" />
                   <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : gigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
            {gigs.map((gig) => (
              <SearchGridItem gig={gig} key={gig.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-[#fafafa] rounded-lg border border-dashed border-gray-200">
             <h4 className="text-2xl font-bold text-[#404145] mb-2">No services found</h4>
             <p className="text-[#74767e]">Try adjusting your search or filters to find what you're looking for.</p>
             <button 
                onClick={() => window.location.href = "/"}
                className="mt-6 font-bold text-fiverr-green hover:underline"
              >
               Clear all filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense fallback={<div>Loading search...</div>}>
      <Search />
    </React.Suspense>
  );
}