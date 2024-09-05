"use client";
import React from "react";
import "@fontsource/poppins"; // Ensure Poppins font is loaded
import "keen-slider/keen-slider.min.css"; // Keen Slider styles
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

const CallToAction = () => {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    breakpoints: {
      "(max-width: 640px)": {
        slides: {
          perView: 1,
          spacing: 5,
        },
      },
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 15,
        },
      },
    },
  });

  return (
    <section className="w-full py-12 px-6 bg-white text-center min-h-[70vh] flex flex-col items-center justify-center">
      {/* Main Heading */}
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] leading-tight md:leading-[67.2px] font-semibold text-[#2F2F2F] tracking-[-0.02em] text-center w-full max-w-[843px]">
          We help professionals
          <br />
          <span className="relative">
            create stunning portfolios
            <span
              className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 rounded-full"
              style={{ height: "5px", width: "100%", bottom: "-5px" }}
            ></span>
          </span>
        </h1>
        <p className="mt-4 sm:mt-6 md:mt-10 text-[14px] sm:text-[16px] font-normal text-[#2F2F2F] opacity-70 leading-[22px] sm:leading-[24px] w-full max-w-[613px]">
          Showcase Your Talent and Achievements Today
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
        <button
          className="bg-[#1B1B1B] text-white text-[16px] sm:text-[18px] leading-[24px] sm:leading-[27px] font-medium px-[20px] py-[10px] sm:px-[30px] sm:py-[15px] rounded-lg hover:bg-gray-900 transition-all"
          style={{ width: "177px", height: "57px" }}
        >
          Join wait list
        </button>

        <button
          className="border border-[#1B1B1B] text-[#1B1B1B] text-[16px] sm:text-[18px] leading-[24px] sm:leading-[27px] font-medium px-[20px] py-[10px] sm:px-[30px] sm:py-[15px] rounded-lg hover:bg-gray-100 transition-all"
          style={{ width: "167px", height: "57px" }}
        >
          Consultation
        </button>
      </div>

      {/* Carousel using Keen Slider */}
      <div className="relative w-full max-w-[90%] mx-auto">
        {/* Slide Buttons */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-100 p-3 rounded-full z-10 transition-all duration-300 ease-in-out"
          onClick={() => slider.current?.prev()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
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

        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg">
            <h3 className="text-white text-lg md:text-xl font-bold">Pitch Deck</h3>
            <Image
              src="/path/to/image1.png"
              alt="Pitch Deck"
              width={300}
              height={200}
              className="mx-auto mt-4"
            />
            <p className="text-white mt-4 text-sm md:text-base">Present with ease</p>
          </div>
          <div className="keen-slider__slide bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg">
            <h3 className="text-white text-lg md:text-xl font-bold">Infographics</h3>
            <Image
              src="/path/to/image2.png"
              alt="Infographics"
              width={300}
              height={200}
              className="mx-auto mt-4"
            />
            <p className="text-white mt-4 text-sm md:text-base">Visualize data</p>
          </div>
          <div className="keen-slider__slide bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-lg">
            <h3 className="text-white text-lg md:text-xl font-bold">Landing Pages</h3>
            <Image
              src="/path/to/image3.png"
              alt="Landing Pages"
              width={300}
              height={200}
              className="mx-auto mt-4"
            />
            <p className="text-white mt-4 text-sm md:text-base">Boost conversions</p>
          </div>
          <div className="keen-slider__slide bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-lg">
            <h3 className="text-white text-lg md:text-xl font-bold">Newsletters</h3>
            <Image
              src="/path/to/image4.png"
              alt="Newsletters"
              width={300}
              height={200}
              className="mx-auto mt-4"
            />
            <p className="text-white mt-4 text-sm md:text-base">Keep in touch</p>
          </div>
          <div className="keen-slider__slide bg-gradient-to-r from-yellow-500 to-green-500 p-6 rounded-lg">
            <h3 className="text-white text-lg md:text-xl font-bold">Brochures</h3>
            <Image
              src="/path/to/image5.png"
              alt="Brochures"
              width={300}
              height={200}
              className="mx-auto mt-4"
            />
            <p className="text-white mt-4 text-sm md:text-base">Engage customers</p>
          </div>
        </div>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-100 p-3 rounded-full z-10 transition-all duration-300 ease-in-out"
          onClick={() => slider.current?.next()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
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
    </section>
  );
};

export default CallToAction;
