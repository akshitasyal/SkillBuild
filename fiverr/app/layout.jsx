"use client";

import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { StateProvider } from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReducers";
import AuthManager from "@/components/AuthManager";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="antialiased">
        <StateProvider initialState={initialState} reducer={reducer}>
          <Toaster position="bottom-right" reverseOrder={false} />
          <AuthManager>
            <div className={`relative flex flex-col min-h-screen ${!pathname.startsWith("/admin") ? "justify-between" : ""}`}>
              {!pathname.startsWith("/admin") && <Navbar />}
              <main
                className={`${pathname !== "/" && !pathname.startsWith("/admin") ? "mt-36" : ""
                  } mb-auto w-full mx-auto`}
              >
                {children}
              </main>
              {!pathname.startsWith("/admin") && <Footer />}
            </div>
          </AuthManager>
        </StateProvider>
      </body>
    </html>
  );
}