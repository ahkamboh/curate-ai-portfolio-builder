import React from "react";
import Image from "next/image";
import "@fontsource/poppins";

const FeaturesSection = () => {
  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-16 xl:px-32 bg-white flex flex-col space-y-16">
      {/* Top section with heading and 93% stat */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full space-y-6 lg:space-y-0">
        {/* Left side with heading and paragraph */}
        <div className="flex flex-col space-y-4 lg:w-1/2">
          <h2 className="text-[#1B1B1B] font-semibold text-[28px] sm:text-[36px] md:text-[40px] lg:text-[45px] leading-tight">
            Don’t let your boring collaterals create any <br />
            <span className="relative">
              collateral damage.
              <span
                className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 rounded-full"
                style={{ height: "5px", width: "100%", bottom: "-5px" }}
              ></span>
            </span>
          </h2>
          <p className="text-[#2F2F2F] text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] opacity-70">
            We are a bunch of creative minds who understand your business and
            design to its needs. After all, there are somethings Ai cannot
            replace.
          </p>
        </div>

        {/* Right side with 93% stat */}
        <div className="flex items-center lg:w-1/2 lg:justify-end mt-8 lg:mt-0">
          <div className="bg-white border border-gray-300 rounded-xl p-4 flex items-center space-x-4">
            {/* Percentage */}
            <div className="rounded-full bg-white p-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C] text-[38px] font-semibold">
                93%
              </span>
            </div>
            {/* Text */}
            <div className="text-left">
              <p className="text-[16px] font-normal text-[#1B1B1B] opacity-70 leading-tight">
                C-suites prefer a video over <br /> powerpoint presentations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image and Features Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-12 w-full space-y-8 lg:space-y-0">
        {/* Image on the left */}
        <div className="relative w-full lg:w-1/2 h-[350px] lg:h-[524px] rounded-lg overflow-hidden border border-gray-300">
          <Image
            src="/mnt/data/image.png" // Use the uploaded image path
            alt="Collaterals Design"
            layout="fill"
            className="object-cover"
          />
        </div>

        {/* Features on the right */}
        <div className="flex flex-col space-y-8 lg:w-1/2">
          <div className="flex items-start space-x-4">
            {/* Icon and text */}
            <div className="flex items-center justify-center w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] bg-white border border-gradient-to-br from-blue-400 to-red-400 rounded-lg">
              <Image
                src="/path/to/icon1.png"
                alt="Icon"
                width={36}
                height={36}
              />
            </div>
            <div>
              <h4 className="text-[20px] sm:text-[24px] font-medium text-[#2F2F2F]">
                Holistic business collaterals revamp
              </h4>
              <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 leading-6 max-w-sm">
                We transform your business collaterals inside out with expert
                designers, writers and strategists.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            {/* Icon and text */}
            <div className="flex items-center justify-center w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] bg-white border border-gradient-to-br from-blue-400 to-red-400 rounded-lg">
              <Image
                src="/path/to/icon2.png"
                alt="Icon"
                width={36}
                height={36}
              />
            </div>
            <div>
              <h4 className="text-[20px] sm:text-[24px] font-medium text-[#2F2F2F]">
                Ultra Modern Designs
              </h4>
              <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 leading-6 max-w-sm">
                Our elite designers create stunning visual material that helps
                you market better.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            {/* Icon and text */}
            <div className="flex items-center justify-center w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] bg-white border border-gradient-to-br from-blue-400 to-red-400 rounded-lg">
              <Image
                src="/path/to/icon3.png"
                alt="Icon"
                width={36}
                height={36}
              />
            </div>
            <div>
              <h4 className="text-[20px] sm:text-[24px] font-medium text-[#2F2F2F]">
                Asset Consultancy
              </h4>
              <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 leading-6 max-w-sm">
                We understand your business and help you build assets that suit
                your needs.
              </p>
            </div>
          </div>

          {/* Talk to an expert button */}
          <button className="w-full lg:w-[201px] h-[57px] bg-transparent border border-black rounded-lg text-[#1B1B1B] text-[18px] font-medium hover:bg-gray-100 transition-all">
            Talk to an expert
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
