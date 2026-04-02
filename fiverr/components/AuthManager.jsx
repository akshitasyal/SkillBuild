"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import api from "@/utils/api";
import { GET_USER_INFO, HOST } from "@/utils/constants";
import { useRouter, usePathname } from "next/navigation";

export default function AuthManager({ children }) {
  const [cookies] = useCookies();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("AuthManager: Initializing context state...");

    // Rehydrate isSeller from cookies
    if (cookies.isSeller === "true") {
      dispatch({ type: reducerCases.SWITCH_MODE });
    }

    const fetchUser = async () => {
      if (cookies.jwt && !userInfo) {
        console.log("AuthManager: JWT found, fetching user info...");
        try {
          const {
            data: { user },
          } = await api.post(
            GET_USER_INFO,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );

          if (user) {
            console.log("AuthManager: User info fetched successfully:", user.username);
            let projectedUserInfo = { ...user };
            if (user.image) {
              projectedUserInfo = {
                ...projectedUserInfo,
                imageName: HOST + "/" + user.image,
              };
            }
            delete projectedUserInfo.image;
            
            dispatch({
              type: reducerCases.SET_USER,
              userInfo: projectedUserInfo,
            });
            console.log("AuthManager: User state updated in context.");
          }
        } catch (err) {
          console.error("AuthManager: Fetching user failed:", err.response?.data?.message || err.message);
          // If the token is invalid, we might want to clear it, but for now we just log it.
        }
      } else {
        console.log("AuthManager: No JWT or user already in state.");
      }
      setIsInitialized(true);
    };

    fetchUser();
  }, [cookies.jwt, userInfo, dispatch]);

  // Handle protected route redirects early
  useEffect(() => {
    if (isInitialized) {
        if ((pathname.includes("/seller") || pathname.includes("/buyer")) && !cookies.jwt) {
            console.log("AuthManager: Accessing protected route without JWT, redirecting to home.");
            router.push("/");
        }
    }
  }, [isInitialized, pathname, cookies.jwt, router]);

  return <>{children}</>;
}
