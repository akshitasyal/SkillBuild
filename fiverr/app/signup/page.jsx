"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import api from "@/utils/api";
import { SIGNUP_ROUTE } from "@/utils/constants";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/navigation";
import { reducerCases } from "@/context/constants";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

const SignupPage = () => {
  const [cookies, setCookies] = useCookies();
  const [{}, dispatch] = useStateProvider();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cookies.jwt) {
      router.push("/dashboard");
    }
  }, [cookies, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("SignupPage: Signup attempt for:", username);
    try {
      const {
        data: { user, jwt },
      } = await api.post(
        SIGNUP_ROUTE,
        { email, password, username }
      );
      console.log("SignupPage: Signup successful for:", user.username);
      setCookies("jwt", jwt, { path: "/" });
      if (user) {
        dispatch({ type: reducerCases.SET_USER, userInfo: user });
        console.log("SignupPage: User state updated in context.");
        window.location.reload();
      }
    } catch (err) {
      console.error("SignupPage: Signup failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-skillbridge-light/30 px-6 py-12">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md border border-skillbridge-border">
        <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
          <h2 className="text-[28px] font-bold text-skillbridge-dark">Join SkillBridge</h2>
          <p className="text-skillbridge-gray text-[15px]">Create an account to start buying and selling.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-8 text-[14px] border border-red-100 flex items-center gap-3">
            <span className="h-2 w-2 bg-red-500 rounded-full"></span>
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 mb-8">
          <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-skillbridge-border rounded-[4px] font-bold text-skillbridge-dark hover:bg-skillbridge-light/50 transition-all group">
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>Facebook</span>
          </button>
          <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-skillbridge-border rounded-[4px] font-bold text-skillbridge-dark hover:bg-skillbridge-light/50 transition-all group">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c3.13 0 5.75-.83 7.74-2.26l-3.57-2.77c-.99.69-2.26 1.1-3.63 1.1-2.03 0-3.74-1.37-4.35-3.22H4.51v2.84A10.98 10.98 0 0012 23z" fill="#34A853"/><path d="M7.65 15.85c-.15-.45-.24-.93-.24-1.43s.09-.98.24-1.43V10.15H4.51a10.98 10.98 0 000 9.7L7.65 15.85z" fill="#FBBC05"/><path d="M12 5.38c2.18 0 3.7.94 4.54 1.73l3.41-3.41C17.76 1.6 15.13 1 12 1a10.98 10.98 0 00-7.49 2.84L7.65 6.69c.61-1.85 2.32-3.22 4.35-3.22z" fill="#EA4335"/></svg>
            <span>Google</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-skillbridge-border"></div>
          </div>
          <span className="relative z-10 bg-white px-4 text-skillbridge-gray text-[11px] font-bold uppercase tracking-widest">
            OR
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-skillbridge-dark">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-skillbridge-gray" size={18} />
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-skillbridge-dark">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-skillbridge-gray" size={18} />
              <input
                type="email"
                className="input-field pl-10"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-skillbridge-dark">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-skillbridge-gray" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                className="input-field pl-10 pr-10"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-skillbridge-gray hover:text-skillbridge-dark"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-3 mt-4">
            Continue
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-skillbridge-gray">
          Already a member?{" "}
          <Link href="/login" className="text-skillbridge-green font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
