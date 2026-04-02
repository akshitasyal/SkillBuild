"use client";

import { useStateProvider } from "@/context/StateContext";
import { GET_UNREAD_MESSAGES, MARK_AS_READ_ROUTE } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function UnreadMessages() {
    const [{ userInfo }] = useStateProvider();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getUnreadMessages = async () => {
            try {
                const {
                    data: { messages: unreadMessages },
                } = await axios.get(GET_UNREAD_MESSAGES, { withCredentials: true });
                setMessages(unreadMessages || []);
            } catch (err) {
                console.error("Failed to fetch unread messages:", err);
            }
        };
        if (userInfo) {
            getUnreadMessages();
        }
    }, [userInfo]);

    const markAsRead = async (id) => {
        try {
            const response = await axios.put(
                `${MARK_AS_READ_ROUTE}/${id}`,
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                setMessages(messages.filter((message) => message.id !== id));
            }
        } catch (err) {
            console.error("Failed to mark as read:", err);
        }
    };

    return (
        <div className="min-h-[80vh] my-10 mt-0 px-32">
            <h3 className="m-5 text-2xl font-semibold">All your Unread Messages</h3>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Text</th>
                            <th scope="col" className="px-6 py-3">Sender Name</th>
                            <th scope="col" className="px-6 py-3">Order Id</th>
                            <th scope="col" className="px-6 py-3">Mark as Read</th>
                            <th scope="col" className="px-6 py-3">View Conversation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message) => (
                            <tr className="bg-white border-b hover:bg-gray-50" key={message.id}>
                                <td className="px-6 py-4">{message?.text}</td>
                                <td className="px-6 py-4">{message?.sender?.fullName}</td>
                                <td className="px-6 py-4 font-medium">{message.orderId}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => markAsRead(message.id)}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Mark as Read
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/seller/orders/messages/${message.orderId}`}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        View
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

export default UnreadMessages;
