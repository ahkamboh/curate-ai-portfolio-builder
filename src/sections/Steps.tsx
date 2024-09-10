import React from "react";

const StepsSection = () => {
  return (
    <div className=" bg-white bg-curate">
      <section className="w-full py-16 px-4 md:px-6 container mx-auto lg:px-16 xl:px-32 flex flex-col space-y-16">
        {/* Top section with heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full space-y-6 lg:space-y-0">
          {/* Left side with heading and paragraph */}
          <div className="flex flex-col space-y-4 lg:w-1/2">
            <h2 className="text-[#1B1B1B] poppins-semibold font-semibold text-[28px] sm:text-[36px] md:text-[40px] lg:text-[45px] leading-tight">
              <span className="pr-2">Build portfolio in</span>
              <span className=" relative w-fit"> <span className="z-20 relative"> 3 easy steps</span>
                <span className="absolute  bottom-0  left-0   w-full ">
                  <svg viewBox="0 0 421 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.00045 9.36813C76.3163 4.57455 232.812 -0.419442 418.009 7.91029" stroke="url(#paint0_linear_3372_10669)" stroke-width="6" stroke-linecap="round" />
                    <defs>
                      <linearGradient id="paint0_linear_3372_10669" x1="3.04687" y1="2" x2="418.03" y2="4.61457" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#8B95F2" />
                        <stop offset="1" stop-color="#FA6F5C" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>
            </h2>
          </div>
          {/* Right side with 43% stat */}
          <div className="flex items-center lg:w-1/2 lg:justify-end mt-8 lg:mt-0">
            <div className=" grid border-gray-300  w-fit p-4  items-center">
              {/* Percentage */}
              <div className=" p-4 bg-white pb-0 border border-b-0 rounded-t-xl z-10 relative top-0.5 w-fit ">
                <span className="text-transparent poppins-bold bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C] text-[40px] w-fit font-bold">
                  43%
                </span>
              </div>
              {/* Text */}
              <div className="border rounded-xl bg-white rounded-tl-none  p-3">
                <p className="text-[16px] font-normal poppins-medium  text-black  leading-tight">
                  Better chances of getting hired <br />
                  with a polished AI-assisted portfolio.

                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Step 1 */}
          <div className="bg-[#F7F5F6] w-full border  h-auto rounded-[20px] p-6 space-y-4">
            <div className="flex items-center space-x-4">
              {/* Step Number */}
              <span className="text-[60px] md:text-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C] opacity-60">
                01
              </span>
            </div>
            {/* Step Text */}
            <h4 className="text-[22px] md:text-[24px] font-medium text-[#2F2F2F]">
              Create Your Profile
            </h4>
            <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 leading-6">
              Provide your personal details, work experience, and skills to begin.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#F7F5F6] w-full h-auto rounded-[20px] border p-6 space-y-4">
            <div className="flex items-center space-x-4">
              {/* Step Number */}
              <span className="text-[60px] md:text-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C] opacity-60">
                02
              </span>
            </div>
            {/* Step Text */}
            <h4 className="text-[22px] md:text-[24px] font-medium text-[#2F2F2F]">
              AI-Powered Suggestions
            </h4>
            <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 leading-6">
              Curate AI provides real-time suggestions for improving your resume or portfolio.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#F7F5F6] w-full border  h-auto rounded-[20px] p-6 space-y-4">
            <div className="flex items-center space-x-4">
              {/* Step Number */}
              <span className="text-[60px] md:text-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C] opacity-60">
                03
              </span>
            </div>
            {/* Step Text */}
            <h4 className="text-[22px] md:text-[24px] font-medium text-[#2F2F2F]">
              Publish & Share
            </h4>
            <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 leading-6">
              Host your resume online and share it with potential employers.
            </p>
          </div>
        </div>

        {/* Get started button */}
        <div className="flex justify-center">
          <button className="relative z-10 border border-black text-black hover:text-white text-[16px] sm:text-[18px] font-medium px-8 py-3 rounded-lg transition-all duration-200 ease-in-out overflow-hidden group w-fit poppins-medium ">
            Get Started
            <span className="absolute -z-10 inset-0 bg-gradient-to-r from-[#7B61FF] via-[#D35D90] to-[#FF7E66] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default StepsSection;
