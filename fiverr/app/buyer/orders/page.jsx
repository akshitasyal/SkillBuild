"use client";

import { useStateProvider } from "@/context/StateContext";
import { GET_BUYER_ORDERS_ROUTE } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [{ userInfo }] = useStateProvider();

    useEffect(() => {
        const getOrders = async () => {
            try {
                const {
                    data: { orders },
                } = await axios.get(GET_BUYER_ORDERS_ROUTE, { withCredentials: true });
                setOrders(orders || []);
            } catch (err) {
                console.error("Failed to fetch buyer orders:", err);
            }
        };
        if (userInfo) getOrders();
    }, [userInfo]);

    return (
        <div className="min-h-[80vh] my-10 mt-0 px-32">
            <h3 className="m-5 text-2xl font-semibold text-gray-800">All your Orders</h3>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Order Id</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Delivery Time</th>
                            <th scope="col" className="px-6 py-3">Order Date</th>
                            <th scope="col" className="px-6 py-3">Send Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr className="bg-white border-b hover:bg-gray-50" key={order.id}>
                                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4">{order.gig.title}</td>
                                <td className="px-6 py-4">{order.gig.category}</td>
                                <td className="px-6 py-4">${order.price}</td>
                                <td className="px-6 py-4">{order.gig.deliveryTime} Days</td>
                                <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/buyer/orders/messages/${order.id}`}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Send
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;
