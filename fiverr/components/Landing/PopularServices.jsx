"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function PopularServices() {
    const router = useRouter();
    const popularServicesData = [
        { name: "Ai Artists", label: "Add talent to AI", image: "/service1.png" },
        { name: "Logo Design", label: "Build your brand", image: "/service2.jpeg" },
        {
            name: "Wordpress",
            label: "Customize your site",
            image: "/service3.jpeg",
        },
        {
            name: "Voice Over",
            label: "Share your message",
            image: "/service4.jpeg",
        },
        {
            name: "Social Media",
            label: "Reach more customers",
            image: "/service5.jpeg",
        },
        { name: "SEO", label: "Unlock growth online", image: "/service6.jpeg" },
        {
            name: "Illustration",
            label: "Color your dreams",
            image: "/service7.jpeg",
        },
        { name: "Translation", label: "Go global", image: "/service8.jpeg" },
    ];
    return (
        <div className="fiverr-container my-20">
            <h2 className="text-[32px] mb-8 text-fiverr-dark font-bold">
                Popular Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {popularServicesData.map(({ name, label, image }) => {
                    return (
                        <div
                            key={name}
                            className="relative h-[345px] w-full cursor-pointer group rounded-[4px] overflow-hidden shadow-sm"
                            onClick={() => router.push(`/search?q=${name.toLowerCase()}`)}
                        >
                            <div className="absolute z-10 text-white left-5 top-5 group-hover:top-4 transition-all duration-300">
                                <span className="text-sm font-semibold mb-1 block opacity-90">{label}</span>
                                <h6 className="font-bold text-2xl leading-tight">{name}</h6>
                            </div>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 z-[1]"></div>
                            <Image 
                                src={image} 
                                fill 
                                alt={name} 
                                className="object-cover group-hover:scale-105 transition-all duration-500"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PopularServices;