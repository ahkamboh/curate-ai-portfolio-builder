import React from "react";
import Image from "next/image";
import "@fontsource/poppins"; // Ensure Poppins font is loaded

const StepsSection = () => {
  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-16 xl:px-32 bg-white flex flex-col space-y-16">
      {/* Top section with heading and 48% stat */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full space-y-6 lg:space-y-0">
        {/* Left side with heading */}
        <div className="flex flex-col space-y-4 lg:w-1/2 relative">
          <h2 className="text-[#1B1B1B] font-semibold text-[32px] sm:text-[36px] md:text-[40px] lg:text-[45px] leading-tight">
            Get started in{" "}
            <span className="relative">
              3 easy steps
              {/* Underline only the "3 easy steps" */}
              <span
                className="absolute bottom-[-2px] left-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 rounded-full"
                style={{ width: "100%", height: "4px" }}
              ></span>
            </span>
          </h2>
        </div>

        {/* Right side with 48% stat */}
        <div className="flex items-center lg:w-1/2 lg:justify-end mt-8 lg:mt-0">
          <div className="bg-white border border-gray-300 rounded-xl p-4 flex items-center space-x-4">
            {/* Percentage */}
            <div className="rounded-full bg-white p-4 flex justify-center items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C] text-[38px] font-semibold">
                48%
              </span>
            </div>
            {/* Text */}
            <div className="text-left flex flex-col justify-center">
              <p className="text-[16px] font-normal text-[#1B1B1B] opacity-70 leading-tight text-center lg:text-left">
                better chances of getting a<br />
                sale with a professional deck
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:space-x-8 w-full space-y-8 lg:space-y-0">
        {/* Step 1 */}
        <div className="bg-[#F7F5F6] w-full lg:w-[413px] h-[271px] rounded-[20px] p-6 space-y-4">
          <div className="flex items-center space-x-4">
            {/* Step Number */}
            <span className="text-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C] opacity-60">
              01
            </span>
          </div>
          {/* Step Text */}
          <h4 className="text-[24px] font-medium text-[#2F2F2F]">
            Fill the Form
          </h4>
          <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 leading-6">
            Tell us your requirements, and we will put together the ideal team.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-[#F7F5F6] w-full lg:w-[413px] h-[271px] rounded-[20px] p-6 space-y-4">
          <div className="flex items-center space-x-4">
            {/* Step Number */}
            <span className="text-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C] opacity-60">
              02
            </span>
          </div>
          {/* Step Text */}
          <h4 className="text-[24px] font-medium text-[#2F2F2F]">
            Kick-off Call
          </h4>
          <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 leading-6">
            Speak to one of our experts to close any loose ends.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-[#F7F5F6] w-full lg:w-[413px] h-[271px] rounded-[20px] p-6 space-y-4">
          <div className="flex items-center space-x-4">
            {/* Step Number */}
            <span className="text-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C] opacity-60">
              03
            </span>
          </div>
          {/* Step Text */}
          <h4 className="text-[24px] font-medium text-[#2F2F2F]">
            Get your designs
          </h4>
          <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 leading-6">
            Start getting your drafts within 24-48hrs.
          </p>
        </div>
      </div>

      {/* Talk to an expert button */}
      <div className="flex justify-center">
        <button className="bg-white border border-black rounded-lg text-[#1B1B1B] text-[18px] font-medium px-6 py-3 hover:bg-gray-100 transition-all">
          Talk to an expert
        </button>
      </div>
    </section>
  );
};

export default StepsSection;
