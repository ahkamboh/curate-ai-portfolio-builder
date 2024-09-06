import React from "react";
import { FaUsers, FaCut, FaDraftingCompass, FaBolt } from "react-icons/fa";

const DesignSection = () => {
  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-16 xl:px-32 bg-white">
      {/* Heading Section */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-start">
        <div className="flex flex-col space-y-4 lg:w-2/3">
          <h2 className="text-[#1B1B1B] font-semibold text-[32px] sm:text-[36px] md:text-[40px] lg:text-[45px] leading-tight">
            Making your collateral building{" "}
            <span className="relative">
              seamless.
              <span
                className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 rounded-full"
                style={{ height: "5px", width: "100%", bottom: "-5px" }}
              ></span>
            </span>
          </h2>
          <p className="text-[#2F2F2F] text-[16px] opacity-70">
            Design your entire sales and marketing stack by a design expert.
          </p>
        </div>

        {/* Stat Section */}
        <div className="flex items-center lg:w-1/2 lg:justify-end mt-8 lg:mt-0">
          <div className="bg-white border border-gray-300 rounded-xl p-4 flex items-center space-x-4">
            {/* Percentage */}
            <div className="rounded-full bg-white p-4 flex justify-center items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C] text-[38px] font-semibold">
                84%
              </span>
            </div>
            {/* Text */}
            <div className="text-left flex flex-col justify-center">
              <p className="text-[16px] font-normal text-[#1B1B1B] opacity-70 leading-tight text-center lg:text-left">
                Pitch decks get rejected <br /> because of poor design
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {/* Card 1 */}
        <div className="bg-[#F1F3FA] rounded-lg p-8 min-h-[350px] flex flex-col items-start text-left justify-center">
          <FaUsers size={36} className="text-[#1B1B1B] mb-4" />
          <h4 className="text-[20px] font-semibold text-[#2F2F2F]">
            Expert All-in-One Team
          </h4>
          <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 mt-2">
            A one-stop shop for designers, writers, and developers, making your
            collateral building seamless.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F1F3FA] rounded-lg p-8 min-h-[350px] flex flex-col items-start text-left justify-center">
          <FaCut size={36} className="text-[#1B1B1B] mb-4" />
          <h4 className="text-[20px] font-semibold text-[#2F2F2F]">
            Tailored Solutions
          </h4>
          <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 mt-2">
            Unique strategies designed just for you, ensuring your brand stands
            out.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F1F3FA] rounded-lg p-8 min-h-[350px] flex flex-col items-start text-left justify-center">
          <FaDraftingCompass size={36} className="text-[#1B1B1B] mb-4" />
          <h4 className="text-[20px] font-semibold text-[#2F2F2F]">
            Design with Detail
          </h4>
          <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 mt-2">
            We take care of every single detail when it comes to our designs and
            optimize to create an impact.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#F1F3FA] rounded-lg p-8 min-h-[350px] flex flex-col items-start text-left justify-center">
          <FaBolt size={36} className="text-[#1B1B1B] mb-4" />
          <h4 className="text-[20px] font-semibold text-[#2F2F2F]">
            Efficiency & Speed
          </h4>
          <p className="text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 mt-2">
            Our streamlined process means faster results, so you can thrive in
            no time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
