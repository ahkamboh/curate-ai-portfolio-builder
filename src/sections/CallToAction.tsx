"use client";
import React from "react";
import "@fontsource/poppins";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

const CallToAction = () => {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(max-width: 640px)": {
        slides: {
          perView: 1,
          spacing: 5,
        },
      },
    },
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  return (
    <section className="w-full py-12 px-6 bg-white text-center flex flex-col items-center justify-center min-h-[70vh]">
      {/* Main Heading */}
      <div className="mb-8">
        <h1 className="text-[32px] sm:text-[64px] font-semibold text-[#2F2F2F] tracking-tight w-full max-w-[843px] mx-auto">
          We help professionals
          <br />
          <span className="relative">
            create stunning portfolios
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 rounded-full"></span>
          </span>
        </h1>
        <p className="mt-4 text-[14px] sm:text-[16px] text-[#2F2F2F] opacity-70 leading-6 max-w-[613px] mx-auto">
          Showcase Your Talent and Achievements Today
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
        <button className="bg-[#1B1B1B] text-white text-[16px] sm:text-[18px] font-medium px-8 py-3 rounded-lg hover:bg-gray-900 transition-all">
          Join wait list
        </button>
        <button className="border border-[#1B1B1B] text-[#1B1B1B] text-[16px] sm:text-[18px] font-medium px-8 py-3 rounded-lg hover:bg-gray-100 transition-all">
          Talk to Bot
        </button>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-[90%] mx-auto">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full z-10 transition-all hover:bg-gray-100"
          onClick={() => slider.current?.prev()}
        >
          <svg
            className="h-6 w-6 text-gray-800"
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

        <div ref={sliderRef} className="keen-slider">
          {[
            "Pitch Deck",
            "Infographics",
            "Landing Pages",
            "Newsletters",
            "Brochures",
          ].map((item, index) => (
            <div
              key={index}
              className={`keen-slider__slide p-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600`}
            >
              <h3 className="text-white text-lg font-bold">{item}</h3>
              <Image
                src={`/path/to/image${index + 1}.png`}
                alt={item}
                width={300}
                height={200}
                className="mx-auto mt-4"
              />
              <p className="text-white mt-4 text-sm">
                Description about {item}
              </p>
            </div>
          ))}
        </div>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full z-10 transition-all hover:bg-gray-100"
          onClick={() => slider.current?.next()}
        >
          <svg
            className="h-6 w-6 text-gray-800"
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
    </section>
  );
};

export default CallToAction;
