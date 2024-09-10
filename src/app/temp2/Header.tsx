"use client";

import React from 'react';
import Image from 'next/image';
import { FaHome } from 'react-icons/fa'; // Assuming an icon library is used for the home icon

const Header: React.FC = () => {
  return (
    <header className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-4 bg-black flex justify-between items-center">
      {/* Left Section: Logo and Brand Name */}
      <div className="flex items-center space-x-3">
        {/* Logo */}
        <div className="w-[39px] h-[30px] relative">
          <Image src="/path/to/logo.png" alt="Logo" layout="fill" objectFit="contain" />
        </div>
        {/* Brand Name */}
        <span className="text-white text-2xl font-normal font-poppins">
          znisa
        </span>
      </div>

      {/* Center Section: Menu Items with styled buttons */}
      <nav className="hidden sm:flex items-center bg-[#1b1b1b] rounded-[290px] border border-[#7986fb] px-1.5 py-1.5">
        <div className="flex items-center space-x-10">
          {/* Home button */}
          <div className="px-4 py-2 bg-[#282828] rounded-[40px] flex items-center gap-1.5">
            <FaHome className="w-5 h-5 text-white" />
          </div>

          {/* About, Projects, Contact me */}
          <ul className="flex space-x-10 text-white font-normal text-base font-poppins">
            <li>
              <a href="#about" className="text-center">About</a>
            </li>
            <li>
              <a href="#projects" className="text-center">Projects</a>
            </li>
            <li>
              <a href="#contact" className="text-center">Contact me</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Right Section: Hire Me button and Profile Icon */}
      <div className="flex items-center space-x-4">
        {/* Hire Me Button */}
        <button className="px-5 py-3.5 bg-gradient-to-r from-[#7986fb] to-[#ffd39c] rounded-[40px] border border-[#7986fb]">
          <span className="text-black font-poppins font-medium text-base">
            Hire me
          </span>
        </button>

        {/* Profile Icon */}
        <div className="relative w-[49px] h-[49px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7986fb] to-[#ffd39c] rounded-full border border-[#7986fb]" />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Placeholder for the profile icon */}
            <div className="w-5 h-5 relative border-[#7986fb]">
              <div className="w-[6.67px] h-[6.67px] rounded-full border border-black absolute top-[1.67px] left-[6.67px]" />
              <div className="w-[11.67px] h-[6.67px] rounded-full border border-black absolute top-[10.83px] left-[4.17px]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
