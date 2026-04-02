import Image from "next/image";
import React from "react";

function JoinFiverr() {
    return (
        <div className="fiverr-container my-24 relative overflow-hidden rounded-[8px]">
            <div className="absolute z-10 top-1/2 -translate-y-1/2 left-8 md:left-16 max-w-[500px]">
                <h4 className="text-white text-4xl md:text-5xl font-bold mb-10 leading-tight">
                    Suddenly it&apos;s all so <span className="italic font-serif">doable.</span>
                </h4>
                <button
                    className="btn-primary py-3 px-8 text-lg"
                    type="button"
                >
                    Join Fiverr
                </button>
            </div>
            <div className="w-full h-[320px] md:h-[400px] relative">
                <Image 
                    src="/bg-signup.webp" 
                    fill 
                    alt="Join Fiverr" 
                    className="object-cover" 
                />
                <div className="absolute inset-0 bg-black/20"></div>
            </div>
        </div>
    );
}

export default JoinFiverr;