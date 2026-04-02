"use client";

import HeroBanner from "@/components/Landing/HeroBanner";
import PopularServices from "@/components/Landing/PopularServices";
import Services from "@/components/Landing/Services";
import React from "react";

function BuyerDashboard() {
  return (
    <div>
      <HeroBanner />
      <PopularServices />
      <Services />
    </div>
  );
}

export default BuyerDashboard;
