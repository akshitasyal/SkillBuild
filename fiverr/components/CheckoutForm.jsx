import React, { useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ gigData, total, clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/success`,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="w-full">
            <div className="p-8 space-y-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#404145] mb-2">Complete your order</h2>
                    <p className="text-sm text-[#62646a]">Enter your payment details for {gigData?.title}</p>
                </div>
                
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                
                {/* General Message */}
                {message && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium animate-in fade-in duration-300">
                        {message}
                    </div>
                )}
            </div>

            <div className="px-8 pb-8 flex flex-col items-center gap-4">
               <div className="flex items-center gap-2 text-xs text-[#95979d]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Payments are secure and encrypted
               </div>
            </div>
        </form>
    );
}