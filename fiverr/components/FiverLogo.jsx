import Image from "next/image";
import React from "react";

function FiverrLogo({ fillColor }) {
    const isWhite = fillColor === "#ffffff" || fillColor === "white" || fillColor === "#fff";
    return (
        <div className="relative h-10 w-44">
            <Image 
                src="/skillbridge_logo.png" 
                alt="SkillBridge Logo" 
                fill 
                className="object-contain"
                priority
            />
        </div>
    );
}

export default FiverrLogo;