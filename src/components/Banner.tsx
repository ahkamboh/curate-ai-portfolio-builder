import React from "react";
import Image from "next/image"; // You can use this for logos if they are available as image files

const Banner = () => {
  return (
    <div className="w-full bg-white py-16 flex justify-center"> {/* Wrapper with white background and spacing */}
      <section className="w-full max-w-[1282px] py-8 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] border border-t border-l border-b border-r border-gray-300">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Heading */}
          <h3 className="text-[16px] sm:text-[18px] text-center font-normal text-[#1B1B1B]">
            <span className="text-[#2E52FF] font-semibold">100+</span> Users Have Used CurateAI Suite To Build Their Portfolios Faster & Better.
          </h3>
        </div>
      </section>
    </div>
  );
};

export default Banner;
