import React, { useEffect, useState } from "react";
import FiverrLogo from "./FiverLogo";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "@/utils/constants";
import ContextMenu from "./ContextMenu";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function Navbar() {
  const [cookies, setCookies] = useCookies();
  const router = useRouter();
  const pathname = usePathname();
  const [navFixed, setNavFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
    useStateProvider();

  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  const links = [
    { linkName: "Explore", handler: "/search", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "/seller", type: "link" },
    { linkName: "Sign in", handler: handleLogin, type: "button" },
    { linkName: "Join", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setNavFixed(true);
    }
  }, [pathname]);

  const handleOrdersNavigate = () => {
    if (isSeller) {
      router.push("/seller/orders");
    } else {
      router.push("/buyer/orders");
    }
  };

  const handleModeSwitch = () => {
    const newMode = !isSeller;
    setCookies("isSeller", newMode.toString(), { path: "/" });
    dispatch({ type: reducerCases.SWITCH_MODE });
    if (newMode) {
      router.push("/seller");
    } else {
      router.push("/buyer");
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  useEffect(() => {
    const clickListener = (e) => {
      e.stopPropagation();

      if (isContextMenuVisible) setIsContextMenuVisible(false);
    };
    if (isContextMenuVisible) {
      window.addEventListener("click", clickListener);
    }
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [isContextMenuVisible]);
  const ContextMenuData = [
    ...(userInfo?.role === "admin"
      ? [
          {
            name: "Admin Dashboard",
            callback: (e) => {
              e.stopPropagation();
              setIsContextMenuVisible(false);
              router.push("/admin/dashboard");
            },
          },
        ]
      : []),
    {
      name: "Profile",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/profile");
      },
    },
    {
      name: "Logout",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full flex justify-between items-center py-4 top-0 z-30 transition-all duration-300 ${
            navFixed || userInfo
              ? "fixed bg-white border-b border-gray-200 shadow-sm"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div className="skillbridge-container w-full flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/">
                <FiverrLogo
                  fillColor={!navFixed && !userInfo ? "#ffffff" : "#404145"}
                />
              </Link>
              <div
                className={`flex items-center transition-all duration-300 ${
                  navFixed || userInfo ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="flex border border-skillbridge-border rounded-[4px] overflow-hidden focus-within:border-skillbridge-gray transition-all">
                  <input
                    type="text"
                    placeholder="What service are you looking for today?"
                    className="w-[25rem] py-2 px-4 outline-none text-sm"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                  />
                  <button
                    className="bg-gray-900 py-2 text-white w-12 flex justify-center items-center hover:bg-black transition-all"
                    onClick={() => {
                      setSearchData("");
                      router.push(`/search?q=${searchData}`);
                    }}
                  >
                    <IoSearchOutline className="text-white h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            {!userInfo ? (
              <ul className="flex gap-8 items-center">
                {links.map(({ linkName, handler, type }) => {
                  return (
                    <li
                      key={linkName}
                      className={`${
                        navFixed ? "text-skillbridge-dark" : "text-white"
                      } font-semibold text-[15px]`}
                    >
                      {type === "link" && (
                        <Link href={handler} className="hover:text-skillbridge-green transition-all">
                          {linkName}
                        </Link>
                      )}
                      {type === "button" && (
                        <button onClick={handler} className="hover:text-skillbridge-green transition-all">
                          {linkName}
                        </button>
                      )}
                      {type === "button2" && (
                        <button
                          onClick={handler}
                          className={`border text-[14px] font-bold py-1.5 px-5 rounded-[4px] transition-all duration-300 ${
                            navFixed
                              ? "border-skillbridge-green text-skillbridge-green hover:bg-skillbridge-green hover:text-white"
                              : "border-white text-white hover:bg-white hover:text-skillbridge-dark"
                          }`}
                        >
                          {linkName}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="flex gap-7 items-center">
                <li
                  className="cursor-pointer text-skillbridge-dark font-semibold hover:text-skillbridge-green transition-all"
                  onClick={() => router.push("/search")}
                >
                  Explore
                </li>
                {isSeller && (
                  <li
                    className="cursor-pointer text-skillbridge-green font-semibold hover:underline"
                    onClick={() => router.push("/seller/gigs/create")}
                  >
                    Create Gig
                  </li>
                )}
                <li
                  className="cursor-pointer text-skillbridge-green font-semibold hover:underline"
                  onClick={handleOrdersNavigate}
                >
                  Orders
                </li>

                {isSeller ? (
                  <li
                    className="cursor-pointer font-semibold text-skillbridge-dark hover:text-skillbridge-green transition-all"
                    onClick={handleModeSwitch}
                  >
                    Switch To Buyer
                  </li>
                ) : (
                  <li
                    className="cursor-pointer font-semibold text-skillbridge-dark hover:text-skillbridge-green transition-all"
                    onClick={handleModeSwitch}
                  >
                    Switch To Seller
                  </li>
                )}
                <li
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsContextMenuVisible(true);
                  }}
                  title="Profile"
                >
                  {userInfo?.imageName ? (
                    <Image
                      src={userInfo.imageName}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full border border-skillbridge-border"
                    />
                  ) : (
                    <div className="bg-purple-600 h-8 w-8 flex items-center justify-center rounded-full relative shadow-sm">
                      <span className="text-sm font-bold text-white">
                        {userInfo &&
                          userInfo?.email &&
                          userInfo?.email.split("")[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </li>
              </ul>
            )}
          </div>
          {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
        </nav>
      )}
    </>
  );
}

export default Navbar;