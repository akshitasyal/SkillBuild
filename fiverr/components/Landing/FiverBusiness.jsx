import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import FiverrLogo from "../FiverLogo";

function FiverrBusiness() {
    return (
        <div className="bg-[#0d084d] py-20 overflow-hidden">
            <div className="fiverr-container flex flex-col lg:flex-row gap-16 items-center">
                <div className="text-white flex flex-col gap-8 justify-center items-start flex-1">
                    <div className="flex items-center gap-3">
                        <FiverrLogo fillColor={"#ffffff"} />
                        <span className="text-white text-3xl font-bold tracking-tight">Business</span>
                    </div>
                    <h2 className="text-[32px] md:text-5xl font-bold leading-tight">
                        A solution built for business
                    </h2>
                    <h4 className="text-xl opacity-90 leading-relaxed max-w-[550px]">
                        Upgrade to a curated experience to access vetted talent and exclusive
                        tools
                    </h4>
                    <ul className="flex flex-col gap-5">
                        {[
                            "Talent matching",
                            "Dedicated account management",
                            "Team collaboration tools",
                            "Business payment solutions",
                        ].map((item) => (
                            <li key={item} className="flex gap-3 items-center">
                                <BsCheckCircle className="text-fiverr-green text-2xl shrink-0" />
                                <span className="text-lg">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="btn-primary mt-4 py-3 px-8 text-lg"
                        type="button"
                    >
                        Explore Fiverr Business
                    </button>
                </div>
                <div className="relative h-[500px] w-full lg:w-1/2 flex-1 rounded-[4px] overflow-hidden shadow-2xl">
                    <Image 
                        src="/business.webp" 
                        alt="Fiverr Business" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default FiverrBusiness;