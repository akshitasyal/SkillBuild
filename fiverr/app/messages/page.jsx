"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStateProvider } from "@/context/StateContext";

export default function MessagesRedirect() {
  const router = useRouter();
  const [{ userInfo, isSeller }] = useStateProvider();

  useEffect(() => {
    if (userInfo) {
      if (isSeller) {
        router.replace("/seller/unread-messages");
      } else {
        // Buyer messages are usually tied to an order, but for now we'll route to orders
        router.push("/buyer/orders");
      }
    } else {
      router.replace("/");
    }
  }, [userInfo, isSeller, router]);

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="animate-pulse text-fiverr-gray font-medium">Loading your messages...</div>
    </div>
  );
}
