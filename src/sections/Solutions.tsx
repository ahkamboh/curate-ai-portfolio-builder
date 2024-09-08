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
            of portfolio solutions
            <span
              className="absolute bottom-[-5px] left-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 rounded-full"
              style={{ width: "100%", height: "4px", bottom: "-4px" }}
            ></span>
          </span>
        </h2>
      </div>

      {/* Solution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 w-full max-w-7xl">
        {/* AI-Powered Resume Builder */}
        <div className="flex flex-col items-center">
          <Image
            src="/path/to/image1.png"
            alt="AI-Powered Resume Builder"
            width={273}
            height={298.95}
            className="object-cover"
          />
          <div className="mt-4 w-full text-left">
            <h4 className="text-[24px] font-semibold text-[#2F2F2F]">
              AI-Powered Resume Builder
            </h4>
            <p className="text-[16px] text-[#2F2F2F] opacity-70 mt-2">
              Get AI suggestions to craft the perfect resume with real-time feedback.
            </p>
            <p className="text-[16px] font-normal text-[#1B1B1B] mt-2">
              Starting from{" "}
              <span className="text-[#2E52FF] text-[24px] font-semibold">
                free
              </span>
            </p>
          </div>
        </div>

        {/* Customizable Portfolio Templates */}
        <div className="flex flex-col items-center">
          <Image
            src="/path/to/image2.png"
            alt="Portfolio Templates"
            width={273}
            height={298.95}
            className="object-cover"
          />
          <div className="mt-4 w-full text-left">
            <h4 className="text-[24px] font-semibold text-[#2F2F2F]">
              Customizable Portfolio Templates
            </h4>
            <p className="text-[16px] text-[#2F2F2F] opacity-70 mt-2">
              Choose from a range of professional, customizable portfolio templates.
            </p>
            <p className="text-[16px] font-normal text-[#1B1B1B] mt-2">
              Starting from{" "}
              <span className="text-[#2E52FF] text-[24px] font-semibold">
                free
              </span>
            </p>
          </div>
        </div>

        {/* Resume Hosting & Sharing */}
        <div className="flex flex-col items-center">
          <Image
            src="/path/to/image3.png"
            alt="Resume Hosting"
            width={273}
            height={298.95}
            className="object-cover"
          />
          <div className="mt-4 w-full text-left">
            <h4 className="text-[24px] font-semibold text-[#2F2F2F]">
              Resume Hosting & Sharing
            </h4>
            <p className="text-[16px] text-[#2F2F2F] opacity-70 mt-2">
              Host your resume on a personalized URL and share it securely with potential employers.
            </p>
            <p className="text-[16px] font-normal text-[#1B1B1B] mt-2">
              Starting from{" "}
              <span className="text-[#2E52FF] text-[24px] font-semibold">
                free
              </span>
            </p>
          </div>
        </div>

        {/* AI Feedback & Endorsements */}
        <div className="flex flex-col items-center">
          <Image
            src="/path/to/image4.png"
            alt="AI Feedback"
            width={273}
            height={298.95}
            className="object-cover"
          />
          <div className="mt-4 w-full text-left">
            <h4 className="text-[24px] font-semibold text-[#2F2F2F]">
              AI Feedback & Endorsements
            </h4>
            <p className="text-[16px] text-[#2F2F2F] opacity-70 mt-2">
              Collect AI-driven feedback on your portfolio and request endorsements.
            </p>
            <p className="text-[16px] font-normal text-[#1B1B1B] mt-2">
              Starting from{" "}
              <span className="text-[#2E52FF] text-[24px] font-semibold">
                free
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
