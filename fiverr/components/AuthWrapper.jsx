"use client";

import { useCookies } from "react-cookie";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants";
import api from "../utils/api";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";

function AuthWrapper({ type }) {
    const [cookies, setCookies] = useCookies();
    const [{ showLoginModal, showSignupModal }, dispatch] = useStateProvider();
    const router = useRouter();

    const [values, setValues] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cookies.jwt) {
            dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
            router.push("/dashboard");
        }
    }, [cookies, dispatch, router]);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleClick = async () => {
        try {
            const { email, password } = values;
            if (email && password) {
                const route = type === "login" ? LOGIN_ROUTE : SIGNUP_ROUTE;
                console.log(`AuthWrapper: ${type} attempt for:`, email);
                const {
                    data: { user, jwt },
                } = await api.post(
                    route,
                    { email, password }
                );
                console.log(`AuthWrapper: ${type} successful for:`, user.username);
                setCookies("jwt", jwt, { path: "/" });
                dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });

                if (user) {
                    dispatch({ type: reducerCases.SET_USER, userInfo: user });
                    console.log("AuthWrapper: User state updated in context.");
                    window.location.reload();
                }
            }
        } catch (err) {
            console.error(`AuthWrapper: ${type} failed:`, err.response?.data?.message || err.message);
            setError(err.response?.data?.message || `${type === "login" ? "Login" : "Signup"} failed.`);
        }
    };

    useEffect(() => {
        const html = document.querySelector("html");
        const authModal = document.querySelector("#auth-modal");
        const blurDiv = document.querySelector("#blur-div");
        html.style.overflowY = "hidden";
        const handleBlurDivClick = () => {
            // dispatch(closeAuthModal());
        };
        const handleAuthModalClick = (e) => {
            // e.stopPropagation();
        };
        authModal?.addEventListener("click", handleAuthModalClick);
        blurDiv?.addEventListener("click", handleBlurDivClick);

        return () => {
            const html = document.querySelector("html");
            html.style.overflowY = "initial";
            blurDiv?.removeEventListener("click", handleBlurDivClick);
            authModal?.removeEventListener("click", handleAuthModalClick);
        };
    }, [dispatch, showLoginModal, showSignupModal]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-fiverr-dark/60 backdrop-blur-sm transition-opacity duration-300"
                id="blur-div"
            ></div>
            <div className="relative z-[101] w-full max-w-[450px] transform transition-all duration-300">
                <div
                    className="bg-white rounded-xl shadow-2xl overflow-hidden"
                    id="auth-modal"
                >
                    <div className="p-10 flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                             <h3 className="text-[28px] font-bold text-fiverr-dark">
                                {type === "login" ? "Sign In" : "Join Fiverr"}
                            </h3>
                            <p className="text-fiverr-gray text-[15px]">
                                {type === "login" 
                                    ? "Welcome back! Please enter your details." 
                                    : "Create an account to start buying and selling."}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-fiverr-border rounded-[4px] font-bold text-fiverr-dark hover:bg-fiverr-light/50 transition-all group">
                                <MdFacebook className="text-2xl text-[#1877F2]" />
                                <span>Continue with Facebook</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-fiverr-border rounded-[4px] font-bold text-fiverr-dark hover:bg-fiverr-light/50 transition-all group">
                                <FcGoogle className="text-2xl" />
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-fiverr-border"></div>
                            </div>
                            <span className="relative z-10 bg-white px-4 text-fiverr-gray text-xs font-bold uppercase tracking-widest">
                                OR
                            </span>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[14px] font-bold text-fiverr-dark">Email / Username</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter your email or username"
                                    className="input-field"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-[14px] font-bold text-fiverr-dark">Password</label>
                                    {type === "login" && (
                                        <button className="text-[13px] font-medium text-fiverr-gray hover:text-fiverr-dark transition-all">
                                            Forgot Password?
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="input-field"
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm font-bold text-center -mt-2">
                                    {error}
                                </div>
                            )}
                            <button
                                className="btn-primary w-full py-3.5 mt-2 font-bold text-[16px]"
                                onClick={handleClick}
                                type="button"
                            >
                                Continue
                            </button>
                        </div>
                    </div>

                    <div className="bg-fiverr-light/20 p-6 flex items-center justify-center border-t border-fiverr-border">
                        <span className="text-[14px] text-fiverr-gray font-medium">
                            {type === "login" ? (
                                <>
                                    Not a member yet?&nbsp;
                                    <button
                                        className="text-fiverr-green font-bold hover:underline ml-1"
                                        onClick={() => {
                                            dispatch({
                                                type: reducerCases.TOGGLE_SIGNUP_MODAL,
                                                showSignupModal: true,
                                            });
                                            dispatch({
                                                type: reducerCases.TOGGLE_LOGIN_MODAL,
                                                showLoginModal: false,
                                            });
                                        }}
                                    >
                                        Join Now
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already a member?&nbsp;
                                    <button
                                        className="text-fiverr-green font-bold hover:underline ml-1"
                                        onClick={() => {
                                            dispatch({
                                                type: reducerCases.TOGGLE_SIGNUP_MODAL,
                                                showSignupModal: false,
                                            });
                                            dispatch({
                                                type: reducerCases.TOGGLE_LOGIN_MODAL,
                                                showLoginModal: true,
                                            });
                                        }}
                                    >
                                        Login Now
                                    </button>
                                </>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthWrapper;