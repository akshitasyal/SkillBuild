"use client";

import { ORDER_SUCCESS_ROUTE } from "../../utils/constants";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function Success() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");

  const [errorStatus, setErrorStatus] = React.useState(null);

  useEffect(() => {
    const changeOrderStatus = async () => {
      try {
        await axios.put(
          ORDER_SUCCESS_ROUTE,
          { paymentIntent },
          { withCredentials: true }
        );
      } catch (err) {
        console.error("Failed to update order status:", err);
        if (err.response && err.response.data) {
          setErrorStatus(err.response.data);
        } else {
          setErrorStatus("Failed to finalize order.");
        }
      }
    };

    if (paymentIntent) {
      if (redirectStatus === "succeeded") {
        changeOrderStatus();
        setTimeout(() => router.push("/buyer/orders"), 4000);
      } else if (redirectStatus === "processing") {
         // Payment is processing, but not yet succeeded
         setTimeout(() => router.push("/buyer/orders"), 5000);
      } else {
        // Handle failure or other statuses
        setTimeout(() => router.push("/"), 5000);
      }
    } else {
      const timeout = setTimeout(() => router.push("/"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [paymentIntent, redirectStatus, router]);

  const getStatusMessage = () => {
    if (errorStatus) return `Order Finalization Error: ${errorStatus}`;
    if (redirectStatus === "succeeded") return "Payment successful! Redirecting to orders...";
    if (redirectStatus === "processing") return "Payment is processing. We'll update your order soon.";
    return "Something went wrong. Redirecting home...";
  };

  return (
    <div className="h-[80vh] flex items-center justify-center px-20 pt-20 flex-col">
      <div className="bg-white p-12 rounded-2xl shadow-xl flex flex-col items-center max-w-2xl border border-gray-100">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 ${redirectStatus === "succeeded" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
            {redirectStatus === "succeeded" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            ) : (
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-current"></div>
            )}
        </div>
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          {getStatusMessage()}
        </h1>
        <p className="text-gray-500 text-center text-lg">
          Please do not close this window while we finalize your order.
        </p>
      </div>
    </div>
  );
}

export default Success;