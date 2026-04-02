import Image from "next/image";
import React from "react";

function Companies() {
    return (
        <div className="flex items-center justify-center bg-fiverr-light/50 py-10">
            <div className="fiverr-container flex items-center justify-center gap-12 flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-fiverr-gray font-bold text-xl mr-4">Trusted by:</span>
                {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="relative h-10 w-24">
                        <Image 
                            src={`/trusted${num}.png`} 
                            alt="trusted brands" 
                            fill 
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Companies;