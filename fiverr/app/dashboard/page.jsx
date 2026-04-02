"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStateProvider } from "@/context/StateContext";

export default function DashboardRedirect() {
  const router = useRouter();
  const [{ userInfo, isSeller }] = useStateProvider();

  useEffect(() => {
    if (userInfo) {
      if (isSeller) {
        router.replace("/seller");
      } else {
        router.replace("/buyer");
      }
    } else {
      router.replace("/");
    }
  }, [userInfo, isSeller, router]);

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="animate-pulse text-fiverr-gray font-medium">Redirecting to your dashboard...</div>
    </div>
  );
}
