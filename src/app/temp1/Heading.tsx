import React from 'react';

interface HeadingProps {
  heading: string; // Specify the type as string for the heading prop
}

export default function Heading({ heading }: HeadingProps) {
  return (
    <div className="relative my-5 w-full p-[2px] rounded-xl overflow-hidden h-[100px] bg-gradient-to-br from-neutral-800 via-black to-[#e63e21]">
      {/* Inner Card Content with Gradient Background */}
      <div className="bg-[#1b1b1b] flex justify-center items-center text-gray-400 text-lg rounded-xl w-full h-24">
        <span className="w-full text-center">{heading}</span>
      </div>
    </div>
  );
}
