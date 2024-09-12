"use client";
import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { SignUpButton } from "@clerk/nextjs";
const CallToAction = () => {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 4,
          spacing: 20,
        },
      },
    },
    
    slides: {
      perView: 1,
      spacing: 2,
    },
  });

  return (
    <section className="bg-curate  bg-white ">
    <div className="w-full pt-12 pb-0 px-6 text-center container mx-auto flex flex-col items-center justify-center min-h-[70vh]">
      {/* Main Heading */}
      <div className="flex flex-col justify-center poppins-semibold items-center">
        <div className="md:text-[48px] text-[32px]   justify-center items-center flex flex-wrap sm:gap-4 gap-1  lg:text-[64px] font-semibold text-[#2F2F2F]">
          <span className=" relative w-fit">We assist
            <span className="absolute  bottom-0 left-0   w-full ">
              <svg   viewBox="0 0 239 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.49992 10.5005C44.5005 5.00071 132 -0.999837 235.5 7.50013" stroke="url(#paint0_linear_3372_10674)" stroke-width="6" stroke-linecap="round" />
                <defs>
                  <linearGradient id="paint0_linear_3372_10674" x1="3.55078" y1="2.42773" x2="235.522" y2="3.88925" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#8B95F2" />
                    <stop offset="1" stop-color="#FA6F5C" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </span>
          <span>professionals</span>
        </div>
        <div className="md:text-[48px] text-[32px] justify-center items-center  flex sm:gap-4 gap-1  flex-wrap   lg:text-[64px] font-semibold text-[#2F2F2F]">
          <span>create stunning</span>
          <span >port<span className=" relative w-fit">folios
            <span className="absolute bottom-0  right-0 w-full ">
              <svg  viewBox="0 0 181 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.49879 9.50016C56.4991 1.99994 132.5 -0.000488394 178.001 9.50033" stroke="url(#paint0_linear_3372_10673)" stroke-width="6" stroke-linecap="round" />
                <defs>
                  <linearGradient id="paint0_linear_3372_10673" x1="3.54297" y1="2.48828" x2="178.038" y2="3.58767" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#8B95F2" />
                    <stop offset="1" stop-color="#FA6F5C" />
                  </linearGradient>
                </defs>
              </svg>
              </span>
            </span>
          </span>
        </div>
      </div>
      <div className=" opacity-70 text-center text-[#2f2f2f] text-base font-normal  pb-10 pt-4 poppins-medium ">Showcase Your Talent and Achievements Today</div>
      {/* Buttons */}
      <div className="flex poppins-medium  flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
      <SignUpButton fallbackRedirectUrl="/portfolio" signInFallbackRedirectUrl="/onboarding">
      <button className="relative z-10 bg-[#1B1B1B] text-white text-[16px] sm:text-[18px] font-medium px-8 py-3 rounded-lg transition-all duration-500 ease-in-out overflow-hidden group">
          Get Started
          <span className="absolute -z-10 inset-0 bg-gradient-to-r from-[#7B61FF] via-[#D35D90] to-[#FF7E66] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
        </button>
        </SignUpButton>
        <button className="relative z-10 border border-black text-black hover:text-white text-[16px] sm:text-[18px] font-medium px-8 py-3 rounded-lg transition-all duration-200 ease-in-out overflow-hidden group">
          Lets Talk Us
          <span className="absolute -z-10 inset-0 bg-gradient-to-r from-[#7B61FF] via-[#D35D90] to-[#FF7E66] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>
        </button>
      </div>
      {/* Carousel */}
      <div className="relative w-full max-w-[90%] mx-auto">
      <div className="flex gap-3 justify-end p-3">
  <button
    className="bg-white p-2 sm:p-3 rounded-full border border-black z-10 transition-all hover:bg-gray-100"
    onClick={() => slider.current?.prev()}
  >
    <svg
      className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
  <button
    className="bg-white p-2 sm:p-3 rounded-full z-10 border border-black transition-all hover:bg-gray-100"
    onClick={() => slider.current?.next()}
  >
    <svg
      className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
</div>

        <div ref={sliderRef} className="keen-slider">
  {[
    "Pitch Deck",
    "Infographics",
    "Landing Pages",
    "Newsletters",
  ].map((item, index) => (
    <div
      key={index}
      className="keen-slider__slide  rounded-2xl overflow-hidden border border-gray-300  bg-gradient-to-r from-[#7B61FF] via-[#D35D90] to-[#FF7E66]"
    >
      <img
        src={`/p${index + 1}.png`} // Ensure the image paths match your actual file locations
        alt={item}
        className="w-full h-full  rounded-2xl"
      />
    </div>
  ))}
</div>


      </div>
    </div>
    </section>
  );
};

export default CallToAction;
