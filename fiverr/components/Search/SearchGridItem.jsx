"use client";

import { HOST, IMAGES_URL } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";

function SearchGridItem({ gig }) {
    const router = useRouter();
    const calculateRatings = () => {
        const { reviews } = gig;
        let rating = 0;
        if (!reviews?.length) {
            return 0;
        }
        reviews?.forEach((review) => {
            rating += review.rating;
        });
        return (rating / reviews.length).toFixed(1);
    };
    return (
        <div
            className="flex flex-col gap-3 cursor-pointer group"
            onClick={() => router.push(`/gig/${gig.id}`)}
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-gray-100 shadow-sm">
                <Image
                    src={`${IMAGES_URL}/${gig.images[0]}`}
                    alt="gig"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-col gap-1.5 px-1">
                <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 rounded-full overflow-hidden flex-shrink-0">
                        {gig.createdBy.profileImage ? (
                            <Image
                                src={HOST + "/" + gig.createdBy.profileImage}
                                alt="profile"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="bg-purple-600 h-full w-full flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                {gig.createdBy?.username ? gig.createdBy.username[0] : ""}
                            </div>
                        )}
                    </div>
                    <span className="text-[#404145] text-sm font-bold hover:underline">
                        {gig.createdBy?.username || "Unknown Seller"}
                    </span>
                </div>
                
                <p className="line-clamp-2 text-[#404145] text-[15px] leading-snug hover:text-fiverr-green transition-all">
                    {gig.title}
                </p>

                <div className="flex items-center gap-1 mt-1">
                    <FaStar className="text-[#404145] text-sm" />
                    <span className="text-[#404145] font-bold text-sm">{calculateRatings()}</span>
                    <span className="text-[#74767e] text-sm">({gig.reviews.length})</span>
                </div>
            </div>

            <div className="mt-auto pt-3 border-t border-gray-100 px-1 flex flex-col gap-0.5">
                <span className="text-[#74767e] text-[11px] font-bold uppercase tracking-wider">Starting at</span>
                <strong className="text-[#404145] text-lg font-bold">${gig.price}</strong>
            </div>
        </div>
    );
}

export default SearchGridItem;