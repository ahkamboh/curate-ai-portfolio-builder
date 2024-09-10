"use client";
import React, { useState, useEffect } from "react";
import "@fontsource/poppins";
import Link from "next/link";
import { X } from "lucide-react"; // Importing close (X) icon from Lucide

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu state

  // Detect scroll position and toggle sticky class
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-white z-30 sticky top-0 ${isSticky ? "border-b" : "bg-curate"} `}
    >
      <div
        className={`w-full flex items-center container mx-auto justify-between py-4 px-6 z-50 transition-all duration-300`}
      >
        <div className="flex items-center space-x-1">
          <div className="w-48">
          <img src="/curateai-trans.png" alt="" />
          </div>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center gap-4">
          {/* Menu */}
          <div className="flex space-x-8">
            <Link
              href="#"
              className="font-poppins font-bold text-[15px] leading-[22.5px] hover:text-black text-left text-gray-700"
            >
              Why us?
            </Link>
            <Link
              href="#"
              className="font-poppins font-bold text-[15px] leading-[22.5px] hover:text-black text-left text-gray-700"
            >
              How it works
            </Link>
            <Link
              href="#"
              className="font-poppins font-bold text-[15px] leading-[22.5px] hover:text-black text-left text-gray-700"
            >
              Solutions
            </Link>
          </div>
          <button
            className="
            w-[228px] 
            h-[45px] 
            px-[21px] 
            py-[11px] 
            border border-gray-400 
            text-gray-700 
             rounded-[10px]
            hover:bg-gray-100 
            focus:outline-none
            font-poppins
            font-medium
            text-[15px]
            leading-[22.5px]
          "
          >
            Schedule a Consultation
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-3/4 bg-white z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-start px-6 py-4 space-y-4">
          <Link
            href="#"
            className="font-poppins font-bold text-[15px] leading-[22.5px] hover:text-black text-left text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            Why us?
          </Link>
          <Link
            href="#"
            className="font-poppins font-bold text-[15px] leading-[22.5px] hover:text-black text-left text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How it works
          </Link>
          <Link
            href="#"
            className="font-poppins font-bold text-[15px] leading-[22.5px] hover:text-black text-left text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Solutions
          </Link>
          <button
            className="
            w-full 
            h-[45px] 
            border border-gray-400 
            text-gray-700 
             rounded-[10px]
            hover:bg-gray-100 
            focus:outline-none
            font-poppins
            font-medium
            text-[15px]
            leading-[22.5px]
          "
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on button click
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
