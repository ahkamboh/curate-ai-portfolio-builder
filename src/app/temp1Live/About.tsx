"use client";
import React, { useState } from "react";

// Define the structure of your profile data
interface ProfileData {
  name: string;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  status: string;
  email: string;
  mailtoLink: string;
}

interface AboutProps {
  profileData: ProfileData; // The profile data passed as a prop from `Page.tsx`
}

const About: React.FC<AboutProps> = ({ profileData }) => {
  const [copied, setCopied] = useState(false); // Track whether the email was copied

  // Copy the email to the clipboard and show "Copied" state
  const copyEmailToClipboard = () => {
    if (profileData?.email) {
      navigator.clipboard.writeText(profileData.email);
      setCopied(true); // Set copied state to true
      setTimeout(() => setCopied(false), 1000); // Reset copied state after 1 second
    }
  };

  return (
    <div className="md:h-[408.01px] flex flex-col justify-center gap-7 sm:px-8 p-8 bg-[#1b1b1b] mt-5 border-2 border-neutral-800 rounded-xl ">
      <div className="flex md:flex-row flex-col-reverse justify-between md:items-center items-start md:gap-0 gap-7 ">
        <h4 className="text-2xl font-medium text-[#c0c0c0] relative">
          {profileData.title}
        </h4>
        <div className="bg-[#171717] border border-[#3f3e3e] px-6 py-2 gap-3 rounded-full flex justify-center items-center">
          <span className="h-3 w-3 bg-[#e63e21] rounded-full"></span>
          <span className="md:text-lg text-sm">{profileData.status}</span>
        </div>
      </div>
      <div className="flex md:flex-row flex-col-reverse justify-between md:items-center items-start gap-6">
        <div className="flex flex-col relative justify-center items-start gap-2">
          <h1 className="text-white md:text-4xl text-3xl font-semibold">
            {profileData.name}
          </h1>
          <p className="text-[#c0c0c0] text-lg font-normal">
            {profileData.content}
          </p>
          <div className="flex gap-2 pt-4">
            {/* Hire me button with mailto link */}
            <a
              href={profileData.mailtoLink}
              className="hover:bg-[#e63e21c6] shadow-[0px_1px_37px_0px_#e63e21af] bg-[#e63e21] border-2 border-[#171717] rounded-md flex justify-center items-center"
            >
              <span className="px-2 font-semibold">Hire me</span>
              <div className="h-10 w-0.5 bg-[#171717]"></div>
              <div className="px-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 7.99854H8V12.9985C8 13.2638 7.89464 13.5181 7.70711 13.7056C7.51957 13.8932 7.26522 13.9985 7 13.9985C6.73478 13.9985 6.48043 13.8932 6.29289 13.7056C6.10536 13.5181 6 13.2638 6 12.9985V7.99854H1C0.734784 7.99854 0.48043 7.89318 0.292893 7.70564C0.105357 7.51811 0 7.26375 0 6.99854C0 6.73332 0.105357 6.47896 0.292893 6.29143C0.48043 6.10389 0.734784 5.99854 1 5.99854H6V0.998535C6 0.733319 6.10536 0.478964 6.29289 0.291428C6.48043 0.103892 6.73478 -0.00146484 7 -0.00146484C7.26522 -0.00146484 7.51957 0.103892 7.70711 0.291428C7.89464 0.478964 8 0.733319 8 0.998535V5.99854H13C13.2652 5.99854 13.5196 6.10389 13.7071 6.29143C13.8946 6.47896 14 6.73332 14 6.99854C14 7.26375 13.8946 7.51811 13.7071 7.70564C13.5196 7.89318 13.2652 7.99854 13 7.99854Z"
                    fill="white"
                  />
                </svg>
              </div>
            </a>

            {/* Email button with copy to clipboard functionality */}
            <button
              onClick={copyEmailToClipboard}
              className="bg-[#171717] border-2 border-[#3f3e3e] rounded-md flex justify-center items-center"
            >
              <span className="px-2 font-semibold text-[#C0C0C0]">Email</span>
              <div className="h-10 w-0.5 bg-[#3f3e3e]"></div>
              <div className="px-2 flex items-center">
                <svg
                  width="24"
                  height="24"
                  className="transition-colors duration-300 text-[#C0C0C0] hover:text-[#f35034] cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={copyEmailToClipboard}
                >
                  <path
                    d="M20.25 3.00049H8.25C8.05109 3.00049 7.86032 3.07951 7.71967 3.22016C7.57902 3.36081 7.5 3.55158 7.5 3.75049V7.50049H3.75C3.55109 7.50049 3.36032 7.57951 3.21967 7.72016C3.07902 7.86081 3 8.05158 3 8.25049V20.2505C3 20.4494 3.07902 20.6402 3.21967 20.7808C3.36032 20.9215 3.55109 21.0005 3.75 21.0005H15.75C15.9489 21.0005 16.1397 20.9215 16.2803 20.7808C16.421 20.6402 16.5 20.4494 16.5 20.2505V16.5005H20.25C20.4489 16.5005 20.6397 16.4215 20.7803 16.2808C20.921 16.1402 21 15.9494 21 15.7505V3.75049C21 3.55158 20.921 3.36081 20.7803 3.22016C20.6397 3.07951 20.4489 3.00049 20.25 3.00049ZM15 19.5005H4.5V9.00049H15V19.5005ZM19.5 15.0005H16.5V8.25049C16.5 8.05158 16.421 7.86081 16.2803 7.72016C16.1397 7.57951 15.9489 7.50049 15.75 7.50049H9V4.50049H19.5V15.0005Z"
                    fill="currentColor"
                  />
                </svg>
                {copied && <span className="text-[#f35034] ml-2">Copied!</span>}
              </div>
            </button>
          </div>
        </div>
        <div className="w-[178px] h-[178px] bg-[#2c2c2c] flex justify-center items-center rounded-full border mr-5 border-[#3f3e3e]">
          <div className="w-[150px] h-[150px] bg-[#2c2c2c] relative rounded-full border border-[#3f3e3e]">
            <img
              src={profileData.imageUrl}
              alt="profile"
              className="rounded-full w-[150px] h-[150px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
