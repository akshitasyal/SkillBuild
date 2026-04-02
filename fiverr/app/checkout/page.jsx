"use client";

import React, { useEffect, useState, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CREATE_ORDER } from "@/utils/constants";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { useRouter, useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
    const [clientSecret, setClientSecret] = useState("");
    const [gigData, setGigData] = useState(null);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const gigId = searchParams.get("gigId");
    const router = useRouter();

    useEffect(() => {
        const createOrderIntent = async () => {
            try {
                const { data } = await axios.post(
                    CREATE_ORDER,
                    { gigId },
                    { withCredentials: true }
                );
                setClientSecret(data.clientSecret);
                setGigData({ 
                    ...data.gig, 
                    serviceFee: data.serviceFee, 
                    totalPrice: data.total 
                });
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 400) {
                    setError(err.response.data);
                } else if (err.response && err.response.status === 403) {
                    setError(err.response.data || "You are not authorized to purchase this gig.");
                } else {
                    setError("Failed to initialize checkout. Please try again later.");
                }
            }
        };
        if (gigId) createOrderIntent();
    }, [gigId]);

    const appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "#1dbf73",
            colorBackground: "#ffffff",
            colorText: "#404145",
            colorDanger: "#df1b41",
            fontFamily: "Inter, sans-serif",
            spacingUnit: "4px",
            borderRadius: "4px",
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    const calculatePricing = () => {
        if (!gigData) return { subtotal: 0, serviceFee: 0, gst: 0, total: 0 };
        const subtotal = gigData.price;
        const serviceFee = gigData.serviceFee ?? parseFloat((subtotal * 0.15).toFixed(2)); 
        const gst = parseFloat(((subtotal + serviceFee) * 0.18).toFixed(2));
        const total = gigData.totalPrice ?? parseFloat((subtotal + serviceFee + gst).toFixed(2));
        return { subtotal, serviceFee, gst, total };
    };

    const { subtotal, serviceFee, gst, total } = calculatePricing();

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1300px] mx-auto py-12 px-6 md:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content */}
                    <div className="flex-[1.8]">
                        <h1 className="text-2xl font-bold text-[#404145] mb-8">Payment methods</h1>
                        
                        {error ? (
                            <div className="flex flex-col items-center justify-center gap-6 py-20 border border-red-100 rounded-lg bg-red-50/30 text-center px-10">
                                <div className="p-4 bg-red-100 rounded-full text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-red-700">Unable to Proceed</h2>
                                    <p className="text-red-600 font-medium max-w-md">{error}</p>
                                </div>
                                <button 
                                    onClick={() => router.back()}
                                    className="px-8 py-3 bg-red-600 text-white rounded-[4px] font-bold hover:bg-red-700 transition-all shadow-sm"
                                >
                                    Go Back to Gig
                                </button>
                            </div>
                        ) : clientSecret ? (
                            <div className="border border-fiverr-border rounded-lg overflow-hidden shadow-sm">
                                <Elements options={options} stripe={stripePromise}>
                                    <CheckoutForm gigData={gigData} total={total} serviceFee={serviceFee} gst={gst} clientSecret={clientSecret} />
                                </Elements>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4 py-20 border border-fiverr-border rounded-lg bg-zinc-50/50">
                                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-fiverr-green"></div>
                                 <p className="text-[#62646a] font-medium pulse">Initializing secure payment...</p>
                            </div>
                        )}
                        
                        <div className="mt-8 flex items-center justify-between text-[#95979d]">
                            <p className="text-sm flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                SSL Secured Payment
                            </p>
                            <div className="flex items-center gap-4">
                                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 grayscale opacity-60" />
                                <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 grayscale opacity-60" />
                                <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" className="h-6 grayscale opacity-60" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="flex-1">
                        <div className="sticky top-12 p-8 border border-fiverr-border rounded-xl bg-white shadow-sm">
                            <div className="flex justify-between items-center mb-10 pb-6 border-b border-fiverr-border">
                                <span className="text-xl font-bold text-[#404145]">Total</span>
                                <span className="text-2xl font-bold text-[#1dbf73]">₹{total.toLocaleString()}</span>
                            </div>

                            <button
                                form="payment-form" // Triggers handleSubmit in CheckoutForm
                                className="w-full bg-[#000000] text-white py-4 rounded-[4px] font-bold text-lg hover:bg-neutral-800 transition-all mb-4"
                            >
                                Confirm & Pay
                            </button>
                            
                            <p className="text-xs text-[#74767e] text-center mb-8 leading-relaxed">
                                By clicking the button, you agree to Fiverr's <br />
                                <span className="underline cursor-pointer font-semibold">Terms of Service</span> and <span className="underline cursor-pointer font-semibold">Payment Terms</span>
                            </p>

                            <div className="flex items-center gap-2 text-[#404145] text-sm font-bold mb-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Safe and secure payment
                            </div>

                            <div className="border-t border-fiverr-border pt-10">
                                <h3 className="text-lg font-bold text-[#404145] mb-8">Price summary</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[#62646a]">
                                        <span>Selected package</span>
                                        <span className="font-bold text-[#404145]">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[#62646a] items-center">
                                        <span className="flex items-center gap-1 cursor-help">
                                            Service fee
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#95979d]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </span>
                                        <span className="font-bold text-[#404145]">₹{serviceFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-fiverr-border pb-6 pt-2 text-[#62646a]">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-[#404145]">₹{(subtotal + serviceFee).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[#62646a] pt-2">
                                        <span className="flex items-center gap-1 cursor-help">
                                            GST
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#95979d]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </span>
                                        <span className="font-bold text-[#404145]">₹{gst.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[#404145] text-lg font-bold pt-6 border-t border-fiverr-border">
                                        <span>Total</span>
                                        <span>₹{total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading checkout...</div>}>
            <Checkout />
        </Suspense>
    );
}
