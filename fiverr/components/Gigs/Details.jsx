"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddReview from "@/components/Gigs/AddReview";
import Reviews from "@/components/Gigs/Reviews";
import { FaStar } from "react-icons/fa";
import { useStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/constants";

function Details() {
    const [{ gigData, hasOrdered, userInfo }] = useStateProvider();
    const [currentImage, setCurrentImage] = useState("");

    useEffect(() => {
        if (gigData) {
            setCurrentImage(gigData.images[0]);
        }
    }, [gigData]);

    const [averageRatings, setAverageRatings] = useState("0");
    useEffect(() => {
        if (gigData && gigData.reviews.length) {
            let avgRating = 0;
            gigData.reviews.forEach(({ rating }) => (avgRating += rating));
            setAverageRatings((avgRating / gigData.reviews.length).toFixed(1));
        }
    }, [gigData]);

    return (
        <div className="flex flex-col gap-10">
            {gigData && currentImage !== "" && (
                <div className="flex flex-col gap-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-skillbridge-dark leading-tight flex items-center gap-3">
                            {gigData.title}
                            {userInfo?.id === gigData?.userId && (
                                <span className="bg-skillbridge-green/10 text-skillbridge-green text-xs px-2.5 py-1 rounded-full border border-skillbridge-green/20 font-bold uppercase tracking-wider animate-pulse">
                                    Your Gig
                                </span>
                            )}
                        </h1>
                        <div className="flex items-center gap-4 py-2 border-y border-skillbridge-border/50">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                {gigData.createdBy.profileImage ? (
                                    <Image
                                        src={HOST + "/" + gigData.createdBy.profileImage}
                                        alt={gigData.createdBy.fullName}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="bg-skillbridge-gray w-full h-full flex items-center justify-center text-white font-bold uppercase">
                                        {gigData.createdBy.email[0]}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-skillbridge-dark text-[15px]">
                                    {gigData.createdBy.fullName}
                                </span>
                                <span className="text-skillbridge-gray text-[14px]">
                                    Top Rated Seller
                                </span>
                            </div>
                            <div className="h-4 w-[1px] bg-skillbridge-border mx-1"></div>
                            <div className="flex items-center gap-1.5">
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
                                <span className="text-[#ffbe5b] font-bold text-[14px]">{averageRatings}</span>
                                <span className="text-skillbridge-gray text-[14px]">({gigData.reviews.length})</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-gray-100 border border-skillbridge-border/50">
                            <Image
                                src={HOST + "/uploads/" + currentImage}
                                alt="Gig detail"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                        {gigData.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {gigData.images.map((image) => (
                                    <div
                                        key={image}
                                        onClick={() => setCurrentImage(image)}
                                        className={`relative h-16 w-24 shrink-0 cursor-pointer rounded-[4px] overflow-hidden border-2 transition-all ${currentImage === image ? "border-skillbridge-green" : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <Image
                                            src={HOST + "/uploads/" + image}
                                            alt="gig thumbnail"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Description Section */}
                    <div>
                        <h3 className="text-xl font-bold text-skillbridge-dark mb-6 pb-2 border-b border-skillbridge-border/50">
                            About this gig
                        </h3>
                        <div className="text-skillbridge-gray text-[16px] leading-[1.6] whitespace-pre-line">
                            {gigData.description}
                        </div>
                    </div>

                    {/* Seller About Section */}
                    <div className="mt-8 p-8 border border-skillbridge-border rounded-[4px] bg-white">
                        <h3 className="text-xl font-bold text-skillbridge-dark mb-8">
                            About the Seller
                        </h3>
                        <div className="flex gap-6 items-start">
                            <div className="relative h-28 w-28 shrink-0 rounded-full overflow-hidden border border-skillbridge-border">
                                {gigData.createdBy.profileImage ? (
                                    <Image
                                        src={HOST + "/" + gigData.createdBy.profileImage}
                                        alt="Seller profile"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="bg-skillbridge-gray w-full h-full flex items-center justify-center text-white text-3xl font-bold uppercase">
                                        {gigData.createdBy.email[0]}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1.5 flex-1">
                                <div className="flex items-center gap-3">
                                    <h4 className="font-bold text-lg text-skillbridge-dark">
                                        {gigData.createdBy.fullName}
                                    </h4>
                                    <span className="text-skillbridge-gray text-[15px]">
                                        @{gigData.createdBy.username}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex gap-0.5 text-[#ffbe5b]">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={Math.ceil(gigData.averageRating) >= star ? "fill-[#ffbe5b]" : "fill-[#e4e5e7]"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[#ffbe5b] font-bold">{gigData.averageRating}</span>
                                    <span className="text-skillbridge-gray">({gigData.totalReviews} reviews)</span>
                                </div>
                                <button className="btn-outline w-fit px-6 py-2 text-[15px]">
                                    Contact Me
                                </button>
                            </div>
                        </div>
                        {gigData.createdBy.description && (
                            <div className="mt-8 pt-6 border-t border-skillbridge-border text-skillbridge-gray text-[15px] leading-relaxed italic">
                                "{gigData.createdBy.description}"
                            </div>
                        )}
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-12">
                        <Reviews />
                        {hasOrdered && (
                            <div className="mt-12 p-8 bg-fiverr-light/30 rounded-[4px] border border-skillbridge-green/20">
                                <AddReview />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Details;