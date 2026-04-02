"use client";
import { useStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function Reviews() {
    const [{ gigData }] = useStateProvider();
    const [averageRatings, setAverageRatings] = useState("0");
    useEffect(() => {
        if (gigData && gigData.reviews.length) {
            let avgRating = 0;
            gigData.reviews.forEach(({ rating }) => (avgRating += rating));
            setAverageRatings((avgRating / gigData.reviews.length).toFixed(1));
        }
    }, [gigData]);

    return (
        <div className="mt-16">
            {gigData && (
                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-6">
                        <h3 className="text-xl font-bold text-fiverr-dark">Reviews</h3>
                        <div className="flex items-center gap-2 py-1 px-3 bg-[#fff7e7] rounded-[4px]">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`${Math.ceil(averageRatings) >= star
                                                ? "text-[#ffbe5b]"
                                                : "text-[#e4e5e7]"
                                            } text-sm`}
                                    />
                                ))}
                            </div>
                            <span className="text-[#ffbe5b] font-bold">{averageRatings}</span>
                            <span className="text-fiverr-gray text-sm">({gigData.reviews.length} reviews)</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-0">
                        {gigData.reviews.map((review, index) => (
                            <div 
                                className={`flex gap-6 py-8 ${index !== 0 ? "border-t border-fiverr-border/50" : ""}`} 
                                key={review.id}
                            >
                                <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden border border-fiverr-border">
                                    {review.reviewer.profileImage ? (
                                        <Image
                                            src={HOST + "/" + review.reviewer.profileImage}
                                            alt={review.reviewer.fullName}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="bg-fiverr-gray w-full h-full flex items-center justify-center text-white font-bold uppercase">
                                            {review.reviewer.email[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3 flex-1">
                                    <div className="flex flex-col gap-1">
                                        <h4 className="font-bold text-fiverr-dark text-[15px]">
                                            {review.reviewer.fullName}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar
                                                        key={star}
                                                        className={`${review.rating >= star
                                                                ? "text-[#ffbe5b]"
                                                                : "text-[#e4e5e7]"
                                                            } text-[13px]`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[#ffbe5b] font-bold text-sm">{review.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-fiverr-gray text-[15px] leading-relaxed max-w-[700px]">
                                        {review.reviewText}
                                    </p>
                                    <div className="text-fiverr-gray/60 text-[13px] font-medium mt-1">
                                        Published 1 week ago
                                    </div>
                                </div>
                            </div>
                        ))}
                        {gigData.reviews.length === 0 && (
                            <div className="py-10 text-center bg-fiverr-light/20 rounded-lg border border-dashed border-fiverr-border">
                                <p className="text-fiverr-gray">No reviews yet for this Gig.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reviews;