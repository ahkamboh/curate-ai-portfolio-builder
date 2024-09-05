import React from 'react';
import '@fontsource/poppins'; // Add this to ensure Poppins font is loaded

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-md">
      <div className="flex items-center space-x-1">
        {/* Logo */}
        <h1 className="text-xl font-bold">
          <span className="text-black">Curate</span>
          <span className="text-gray-400">AI</span>
        </h1>
        <span className="text-gray-400 text-xs">suite</span>
      </div>

      {/* Menu */}
      <nav className="hidden md:flex space-x-8">
        <a href="#" className="font-poppins font-semibold text-[15px] leading-[22.5px] hover:text-black text-left text-gray-700">
          Why us?
        </a>
        <a href="#" className="font-poppins font-semibold text-[15px] leading-[22.5px] hover:text-black text-left text-gray-700">
          How it works
        </a>
        <a href="#" className="font-poppins font-semibold text-[15px] leading-[22.5px] hover:text-black text-left text-gray-700">
          Solutions
        </a>
      </nav>

      {/* Schedule a Consultation Button */}
      <div className="hidden md:flex">
        <button 
          className="
            w-[228px] 
            h-[45px] 
            px-[21px] 
            py-[11px] 
            border border-gray-400 
            text-gray-700 
            rounded-tl-[10px] 
            rounded-tr-[10px] 
            rounded-br-[10px]
            rounded-bl-[10px]
            hover:bg-gray-100 
            focus:outline-none
            text-const first = useContext(second)
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
        <button className="text-gray-700 focus:outline-none">
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
    </header>
  );
};

export default Header;
