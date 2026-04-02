"use client";

import { useStateProvider } from "@/context/StateContext";
import { GET_GIG_DATA, HOST, GET_USER_GIGS_ROUTE, DELETE_GIG_ROUTE } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Image from "next/image";

function Gigs() {
    const [cookies] = useCookies();
    const router = useRouter();
    const [{ userInfo }] = useStateProvider();
    const [gigs, setGigs] = useState([]);

    useEffect(() => {
        const getUserGigs = async () => {
            try {
                const response = await axios.get(GET_USER_GIGS_ROUTE, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${cookies.jwt}`,
                    },
                });
                if (response.status === 200) {
                    setGigs(response.data.gigs);
                }
            } catch (err) {
                console.error("Failed to fetch seller gigs:", err);
            }
        };
        if (userInfo) {
            getUserGigs();
        }
    }, [userInfo, cookies.jwt]);

    const deleteGig = async (id) => {
        try {
            const response = await axios.delete(`${DELETE_GIG_ROUTE}/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookies.jwt}`,
                },
            });
            if (response.status === 200) {
                setGigs(gigs.filter((gig) => gig.id !== id));
            }
        } catch (err) {
            console.error("Failed to delete gig:", err);
        }
    };

    return (
        <div className="fiverr-container py-12">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-fiverr-dark">Your Gigs</h1>
                <Link 
                    href="/seller/gigs/create" 
                    className="flex items-center gap-2 bg-fiverr-green hover:bg-fiverr-hover text-white px-6 py-3 rounded font-bold transition-all shadow-sm"
                >
                    <FiPlus /> Create New Gig
                </Link>
            </div>

            <div className="bg-white border border-fiverr-border rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-fiverr-light/30 border-b border-fiverr-border">
                            <th className="p-5 font-bold text-fiverr-dark text-sm uppercase tracking-wider">Gig Title</th>
                            <th className="p-5 font-bold text-fiverr-dark text-sm uppercase tracking-wider">Thumbnail</th>
                            <th className="p-5 font-bold text-fiverr-dark text-sm uppercase tracking-wider">Category</th>
                            <th className="p-5 font-bold text-fiverr-dark text-sm uppercase tracking-wider">Price</th>
                            <th className="p-5 font-bold text-fiverr-dark text-sm uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-fiverr-border">
                        {gigs.length > 0 ? (
                            gigs.map((gig) => (
                                <tr key={gig.id} className="hover:bg-fiverr-light/10 transition-colors">
                                    <td className="p-5 text-fiverr-dark font-medium max-w-[400px]">
                                        <div className="truncate" title={gig.title}>{gig.title}</div>
                                    </td>
                                    <td className="p-5">
                                        <div className="relative h-12 w-20 rounded overflow-hidden border border-fiverr-border bg-fiverr-light/20">
                                            {gig.images?.[0] ? (
                                                <Image 
                                                    src={HOST + "/uploads/" + gig.images[0]} 
                                                    alt={gig.title} 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-fiverr-gray italic">No Image</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-5 text-fiverr-gray">{gig.category}</td>
                                    <td className="p-5 text-fiverr-dark font-bold">${gig.price}</td>
                                    <td className="p-5">
                                        <div className="flex justify-end gap-4">
                                            <button 
                                                onClick={() => router.push(`/seller/gigs/${gig.id}`)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded"
                                                title="Edit Gig"
                                            >
                                                <FiEdit size={18} />
                                            </button>
                                            <button 
                                                onClick={() => deleteGig(gig.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded"
                                                title="Delete Gig"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-12 text-center text-fiverr-gray italic">
                                    You haven't created any gigs yet. Start by creating your first gig!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Gigs;