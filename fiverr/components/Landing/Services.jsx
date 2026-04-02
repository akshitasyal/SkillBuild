"use client";

import { categories } from "../../utils/categories";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Services() {
    const router = useRouter();

    return (
        <div className="fiverr-container my-24">
            <h2 className="text-[32px] mb-12 text-fiverr-dark font-bold ">
                You need it, we&apos;ve got it
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-12">
                {categories.map(({ name, logo }) => {
                    return (
                        <div
                            key={name}
                            className="flex flex-col justify-center items-center cursor-pointer group gap-4 transition-all duration-300"
                            onClick={() => router.push(`/search?category=${name}`)}
                        >
                            <div className="relative h-12 w-12 transition-transform duration-300 group-hover:-translate-y-1">
                                {logo && (
                                    <Image src={logo} alt={name} fill className="object-contain" />
                                )}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-fiverr-border group-hover:bg-fiverr-green transition-colors"></div>
                            </div>
                            <span className="text-fiverr-dark font-medium text-[15px] group-hover:text-fiverr-green transition-colors">{name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Services;