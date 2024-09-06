import React from "react";
import Image from "next/image";
import "@fontsource/poppins"; // Ensure Poppins font is loaded

const SolutionsSection = () => {
  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-16 xl:px-32 bg-white">
      {/* Heading */}
      <div className="flex justify-start mb-12 w-full">
        <h2 className="text-[#1B1B1B] font-semibold text-[32px] sm:text-[36px] md:text-[40px] lg:text-[45px] leading-tight">
          The full suite{" "}
          <span className="relative">
            solution
            <span
              className="absolute bottom-[-5px] left-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 rounded-full"
              style={{ width: "100%", height: "4px", bottom: "-4px" }}
            ></span>
          </span>
        </h2>
      </div>

      {/* Solution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 w-full max-w-7xl">
        {/* E-Books */}
        <div className="flex flex-col items-center">
          <Image
            src="/path/to/image1.png"
            alt="E-Books"
            width={273}
            height={298.95}
            className="object-cover"
          />
          <div className="mt-4 w-full text-left">
            <h4 className="text-[24px] font-semibold text-[#2F2F2F]">
              E-Books
            </h4>
            <p className="text-[16px] text-[#2F2F2F] opacity-70 mt-2">
              Driving growth, capturing markets, and maximizing revenue with
              innovative solutions
            </p>
            <p className="text-[16px] font-normal text-[#1B1B1B] mt-2">
              Starting from{" "}
              <span className="text-[#2E52FF] text-[24px] font-semibold">
                $100
              </span>
            </p>
          </div>
        </div>

        {/* Sales Deck */}
        <div className="flex flex-col items-center">
          <Image
            src="/path/to/image2.png"
            alt="Sales Deck"
            width={273}
            height={298.95}
            className="object-cover"
          />
          <div className="mt-4 w-full text-left">
            <h4 className="text-[24px] font-semibold text-[#2F2F2F]">
              Sales Deck
            </h4>
            <p className="text-[16px] text-[#2F2F2F] opacity-70 mt-2">
              Driving growth, capturing markets, and maximizing revenue with
              innovative solutions
            </p>
            <p className="text-[16px] font-normal text-[#1B1B1B] mt-2">
              Starting from{" "}
              <span className="text-[#2E52FF] text-[24px] font-semibold">
                $100
              </span>
            </p>
          </div>
        </div>

        {/* Reports */}
        <div className="flex flex-col items-center">
          <Image
            src="/path/to/image3.png"
            alt="Reports"
            width={273}
            height={298.95}
            className="object-cover"
          />
          <div className="mt-4 w-full text-left">
            <h4 className="text-[24px] font-semibold text-[#2F2F2F]">
              Reports
            </h4>
            <p className="text-[16px] text-[#2F2F2F] opacity-70 mt-2">
              Driving growth, capturing markets, and maximizing revenue with
              innovative solutions
            </p>
            <p className="text-[16px] font-normal text-[#1B1B1B] mt-2">
              Starting from{" "}
              <span className="text-[#2E52FF] text-[24px] font-semibold">
                $100
              </span>
            </p>
          </div>
        </div>

        {/* Videos and Explainers */}
        <div className="flex flex-col items-center">
          <Image
            src="/path/to/image4.png"
            alt="Videos and Explainers"
            width={273}
            height={298.95}
            className="object-cover"
          />
          <div className="mt-4 w-full text-left">
            <h4 className="text-[24px] font-semibold text-[#2F2F2F]">
              Videos and Explainers
            </h4>
            <p className="text-[16px] text-[#2F2F2F] opacity-70 mt-2">
              Driving growth, capturing markets, and maximizing revenue with
              innovative solutions
            </p>
            <p className="text-[16px] font-normal text-[#1B1B1B] mt-2">
              Starting from{" "}
              <span className="text-[#2E52FF] text-[24px] font-semibold">
                $100
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
