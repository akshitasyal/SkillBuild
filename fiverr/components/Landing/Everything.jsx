import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
function Everything() {
    const everythingData = [
        {
            title: "Stick to your budget",
            subtitle:
                "Find the right service for every price point. No hourly rates, just project-based pricing.",
        },
        {
            title: "Get quality work done quickly",
            subtitle:
                "Hand your project over to a talented freelancer in minutes, get long-lasting results.",
        },
        {
            title: "Pay when you're happy",
            subtitle:
                "Upfront quotes mean no surprises. Payments only get released when you approve.",
        },
        {
            title: "Count on 24/7 support",
            subtitle:
                "Our round-the-clock support team is available to help anytime, anywhere.",
        },
    ];
    return (
        <div className="bg-[#f1fdf7] py-24">
            <div className="skillbridge-container flex items-center justify-between gap-16 flex-col lg:flex-row">
                <div className="flex-1">
                    <h2 className="text-[32px] md:text-4xl mb-12 text-skillbridge-dark font-bold max-w-[500px] leading-tight">
                        The best part? Everything.
                    </h2>
                    <ul className="flex flex-col gap-8">
                        {everythingData.map(({ title, subtitle }) => {
                            return (
                                <li key={title} className="group">
                                    <div className="flex gap-3 items-center text-lg font-bold text-skillbridge-dark mb-2">
                                        <BsCheckCircle className="text-skillbridge-gray group-hover:text-skillbridge-green transition-colors text-xl" />
                                        <h4>{title}</h4>
                                    </div>
                                    <p className="text-skillbridge-gray text-[17px] leading-relaxed max-w-[480px]">{subtitle}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="relative h-[450px] w-full lg:w-1/2 flex-1 rounded-[4px] overflow-hidden shadow-xl">
                    <Image 
                        src="/everything.webp" 
                        fill 
                        alt="Everything on SkillBridge" 
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default Everything;