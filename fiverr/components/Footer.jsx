"use client";

import Link from "next/link";
import React from "react";
import {
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import FiverrLogo from "./FiverLogo";
import { categories } from "@/utils/categories";

function Footer() {
  const socialLinks = [
    { name: "Github", icon: <FiGithub />, link: "https://www.github.com" },
    {
      name: "LinkedIn",
      icon: <FiLinkedin />,
      link: "https://www.linkedin.com/in/koolkishan/",
    },
    {
      name: "Instagram",
      icon: <FiInstagram />,
      link: "https://instagram.com/koolkishansheth",
    },
    {
      name: "Twitter",
      icon: <FiTwitter />,
      link: "https://twitter.com/koolkishansheth",
    },
  ];
  const data = [
    {
      headerName: "Categories",
      links: [
        ...categories.map(({ name }) => ({
          name,
          link: `/search?category=${name}`,
        })),
      ],
    },
    {
      headerName: "About",
      links: [
        { name: "Careers", link: "#" },
        { name: "Press & News", link: "#" },
        { name: "Partnership", link: "#" },
        { name: "Privacy Policy", link: "#" },
        { name: "Terms of Service", link: "#" },
        { name: "Intellectual Property Claims", link: "#" },
        { name: "Investor Relations", link: "#" },
      ],
    },
    {
      headerName: "Support",
      links: [
        { name: "Help & Support", link: "#" },
        { name: "Trust & Safety", link: "#" },
        { name: "Selling on Fiverr", link: "#" },
        { name: "Buying on Fiverr", link: "#" },
      ],
    },
    {
      headerName: "Community",
      links: [
        { name: "Community Success Stories", link: "#" },
        { name: "Community Hub", link: "#" },
        { name: "Forum", link: "#" },
        { name: "Events", link: "#" },
        { name: "Blog", link: "#" },
        { name: "Influencers", link: "#" },
        { name: "Affiliates", link: "#" },
        { name: "Podcast", link: "#" },
        { name: "Invite a Friend", link: "#" },
        { name: "Become a Seller", link: "#" },
        { name: "Community Standards", link: "#" },
      ],
    },
    {
      headerName: "Move From Fiverr",
      links: [
        { name: "Fiverr Business", link: "#" },
        { name: "Fiverr Pro", link: "#" },
        { name: "Fiverr Logo Maker", link: "#" },
        { name: "Fiverr Guides", link: "#" },
        { name: "Get Inspired", link: "#" },
        { name: "Fiverr Select", link: "#" },
        { name: "ClearVoice", link: "#" },
        { name: "Fiverr Workspace", link: "#" },
        { name: "Learn", link: "#" },
        { name: "Working Not Working", link: "#" },
      ],
    },
  ];
  return (
    <footer className="w-full border-t border-skillbridge-border bg-white mt-16 pt-16 pb-8">
      <div className="skillbridge-container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
          {data.map(({ headerName, links }) => {
            return (
              <div key={headerName} className="flex flex-col gap-5">
                <span className="font-bold text-skillbridge-dark text-[16px]">{headerName}</span>
                <ul className="flex flex-col gap-4">
                  {links.map(({ name, link }) => (
                    <li key={name} className="text-skillbridge-gray hover:text-skillbridge-dark transition-all text-[15px]">
                      <Link href={link}>{name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        
        <div className="pt-8 border-t border-skillbridge-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 flex-col md:flex-row">
            <span className="text-skillbridge-gray text-sm md:ml-4">
              © Fiverr International Ltd. 2026
            </span>
          </div>
          
          <div className="flex items-center gap-10">
            <ul className="flex gap-6">
              {socialLinks.map(({ icon, link, name }) => (
                <li
                  key={name}
                  className="text-xl text-skillbridge-gray hover:text-skillbridge-dark transition-all"
                  title={name}
                >
                  <Link href={link}>{icon}</Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 text-skillbridge-gray font-bold text-sm">
                <span className="flex items-center gap-1 cursor-pointer">🌐 English</span>
                <span className="flex items-center gap-1 cursor-pointer">USD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;