"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
function HomeBanner() {
    const router = useRouter();
    const [image, setImage] = useState(1);
    const [searchData, setSearchData] = useState("");
    useEffect(() => {
        const interval = setInterval(
            () => setImage(image >= 6 ? 1 : image + 1),
            10000
        );
        return () => clearInterval(interval);
    }, [image]);

    return (
        <div className="h-[680px] relative bg-gray-900 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full z-0">
                <Image
                    alt="hero"
                    src="/bg-hero1.webp"
                    fill
                    className={`${image === 1 ? "opacity-100 scale-105" : "opacity-0"
                        } transition-all duration-1000 object-cover`}
                />
                <Image
                    alt="hero"
                    src="/bg-hero2.webp"
                    fill
                    className={`${image === 2 ? "opacity-100 scale-105" : "opacity-0"
                        } transition-all duration-1000 object-cover`}
                />
                <Image
                    alt="hero"
                    src="/bg-hero3.webp"
                    fill
                    className={`${image === 3 ? "opacity-100 scale-105" : "opacity-0"
                        } transition-all duration-1000 object-cover`}
                />
                <Image
                    alt="hero"
                    src="/bg-hero4.webp"
                    fill
                    className={`${image === 4 ? "opacity-100 scale-105" : "opacity-0"
                        } transition-all duration-1000 object-cover`}
                />
                <Image
                    alt="hero"
                    src="/bg-hero5.webp"
                    fill
                    className={`${image === 5 ? "opacity-100 scale-105" : "opacity-0"
                        } transition-all duration-1000 object-cover`}
                />
                <Image
                    alt="hero"
                    src="/bg-hero6.webp"
                    fill
                    className={`${image === 6 ? "opacity-100 scale-105" : "opacity-0"
                        } transition-all duration-1000 object-cover`}
                />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-[1]"></div>
            
            <div className="z-10 relative skillbridge-container flex justify-center flex-col h-full gap-8">
                <div className="max-w-[700px] flex flex-col gap-8">
                    <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                        Find the perfect <span className="italic font-serif">freelance</span>
                        <br />
                        services for your business
                    </h1>
                    <div className="flex w-full group shadow-2xl rounded-[4px] overflow-hidden">
                        <div className="relative flex-1 bg-white">
                            <IoSearchOutline className="absolute text-[#95979d] text-xl top-1/2 -translate-y-1/2 left-4 group-focus-within:text-skillbridge-dark transition-colors" />
                            <input
                                type="text"
                                className="h-14 w-full pl-12 pr-4 outline-none text-lg text-[#404145] placeholder:text-[#95979d]"
                                placeholder='Try "logo design"'
                                value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-skillbridge-green hover:bg-[#19a463] text-white px-10 text-lg font-bold transition-all duration-300"
                            onClick={() => router.push(`/search?q=${searchData}`)}
                        >
                            Search
                        </button>
                    </div>
                    <div className="text-white flex items-center gap-4 text-sm font-semibold">
                        <span>Popular:</span>
                        <ul className="flex flex-wrap gap-3">
                            {[
                                { name: "Website Design", query: "website design" },
                                { name: "WordPress", query: "wordpress" },
                                { name: "Logo Design", query: "logo design" },
                                { name: "AI Services", query: "ai services" },
                            ].map((tag) => (
                                <li
                                    key={tag.name}
                                    className="px-3 py-1 border border-white rounded-full hover:bg-white hover:text-skillbridge-dark transition-all duration-300 cursor-pointer backdrop-blur-sm"
                                    onClick={() => router.push(`/search?q=${tag.query}`)}
                                >
                                    {tag.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeBanner;