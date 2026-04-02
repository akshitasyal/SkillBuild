"use client";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ADD_REVIEW } from "@/utils/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function AddReview() {
    const [{ gigData }, dispatch] = useStateProvider();
    const [data, setData] = useState({ reviewText: "", rating: 0 });
    const params = useParams();
    const id = params.id;
    
    const addReview = async () => {
        try {
            const response = await axios.post(
                `${ADD_REVIEW}/${id}`,
                { ...data },
                { withCredentials: true }
            );
            if (response.status === 201) {
                setData({ reviewText: "", rating: 0 });
                dispatch({
                    type: reducerCases.ADD_REVIEW,
                    newReview: response.data.newReview,
                });
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-fiverr-dark">
                Add a Review for {gigData?.createdBy?.fullName}
            </h3>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-fiverr-gray text-[15px] font-bold">Select Rating</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <FaStar
                                key={num}
                                className={`cursor-pointer transition-all text-2xl ${data.rating >= num ? "text-[#ffbe5b]" : "text-[#e4e5e7] hover:text-[#ffbe5b]"
                                    }`}
                                onClick={() => setData({ ...data, rating: num })}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="reviewText" className="text-fiverr-gray text-[15px] font-bold">Your Review</label>
                    <textarea
                        name="reviewText"
                        id="reviewText"
                        onChange={(e) => setData({ ...data, reviewText: e.target.value })}
                        value={data.reviewText}
                        rows={4}
                        className="input-field py-3 transition-all focus:border-fiverr-green"
                        placeholder="What was it like working with this seller?"
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button
                        className="btn-primary py-2.5 px-8 text-[15px] font-bold"
                        onClick={addReview}
                        disabled={!data.reviewText || data.rating === 0}
                    >
                        Add Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddReview;