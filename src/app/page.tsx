"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc, DocumentData, Timestamp } from "firebase/firestore";
import { SignInButton, useUser } from '@clerk/nextjs'; // Import Clerk hooks
import Link from "next/link";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [showLoader, setShowLoader] = useState(true);
  const emailSentRef = useRef(false); // Ref to track if the email has been sent
  const countdownDuration = 11 * 24 * 60 * 60 * 1000;
  const { isSignedIn, user } = useUser(); // Use Clerk's hook to get user information

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCountdownStartTime = async () => {
      try {
        const docRef = doc(db, "countdown", "startTime");
        const docSnap = await getDoc(docRef);
        let countdownStartTime: number;

        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          countdownStartTime = (data.timestamp as Timestamp).toMillis();
        } else {
          countdownStartTime = new Date().getTime();
          await setDoc(docRef, { timestamp: Timestamp.fromDate(new Date()) });
        }

        const countdownEndTime = countdownStartTime + countdownDuration;

        const interval = setInterval(() => {
          const now = new Date().getTime();
          const distance = countdownEndTime - now;

          if (distance >= 0) {
            setCountdown({
              days: Math.floor(distance / (1000 * 60 * 60 * 24)),
              hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
              minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
              seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
          } else {
            clearInterval(interval);
            setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          }
        }, 1000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error fetching or setting countdown start time:", error);
      }
    };

    fetchCountdownStartTime();
  }, []);

  useEffect(() => {
    if (isSignedIn && user && !emailSentRef.current) { 
      // Check if the user is signed in and email is not sent yet
      handleSendEmail(user.primaryEmailAddress?.emailAddress || '', user.firstName || '');
    }
  }, [isSignedIn, user]);

  const handleSendEmail = async (email: string, name: string) => {
    if (!email || emailSentRef.current) return; // Exit if no email is provided or email already sent

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Email sent successfully:", data.message);
        emailSentRef.current = true; // Set emailSentRef to true after sending the email
      } else {
        console.error("Error sending email:", data.error);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <main className="flex min-h-screen max-w-[43.5rem] mx-auto flex-col items-center justify-center p-6 bg">
   
      <Link href={'/'} className="absolute top-0 gap-2 left-0 p-6 flex justify-center items-center group">
        <div className="d">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M39.9903 0.270225L30.2035 36.8334C30.1538 36.9993 29.9547 37.0491 29.8386 36.9329L23.2864 30.3771L28.1964 12.0541C28.2462 11.8881 28.0969 11.7387 27.931 11.7885L9.61815 16.7012L3.09917 10.1786C2.98306 10.0624 3.03282 9.86327 3.1987 9.81348L39.7249 0.00467392C39.8907 -0.02852 40.04 0.120853 39.9903 0.270225Z" fill="#fa0053" />
            <path opacity="0.5" d="M23.2861 30.3768L20.7648 39.8371C20.715 40.0031 20.516 40.0529 20.3998 39.9367L0.0632817 19.6054C-0.0528324 19.4892 -0.00306943 19.2901 0.162808 19.2403L9.61781 16.7009L23.2861 30.3768Z" fill="#fa0053" />
            <path d="M28.1957 12.0538L23.2857 30.3768L9.61743 16.7009L27.9303 11.7882C28.0962 11.7384 28.2454 11.8878 28.1957 12.0538Z" fill="#fa0053" />
          </svg>
        </div>
        <div className="font-bold text-2xl mt-1 ClashDisplay-Bold group-hover:tracking-wider transition-all duration-300 tracking-wide ">Curate</div>
      </Link>

      {/* Countdown Display */}
      
      <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-white/20 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30">
        <div className="flex flex-col items-center justify-center bg-black/10 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30 text-gray-100 text-4xl sm:text-5xl lg:text-6xl p-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          {String(countdown.days).padStart(2, '0')}
          <sub className="text-xs sm:text-sm lg:text-base text-gray-300">DAYS</sub>
        </div>
        <div className="flex flex-col items-center justify-center bg-black/10 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30 text-gray-100 text-4xl sm:text-5xl lg:text-6xl p-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          {String(countdown.hours).padStart(2, '0')}
          <sub className="text-xs sm:text-sm lg:text-base text-gray-300">HOURS</sub>
        </div>
        <div className="flex flex-col items-center justify-center bg-black/10 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30 text-gray-100 text-4xl sm:text-5xl lg:text-6xl p-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          {String(countdown.minutes).padStart(2, '0')}
          <sub className="text-xs sm:text-sm lg:text-base text-gray-300">MIN</sub>
        </div>
        <div className="text-4xl sm:text-5xl lg:text-6xl text-green-500 px-2 sm:block hidden">:</div>
        <div className="flex flex-col items-center justify-center bg-black/10 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30 text-gray-100 text-4xl sm:text-5xl lg:text-6xl p-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          {String(countdown.seconds).padStart(2, '0')}
          <sub className="text-xs sm:text-sm lg:text-base text-gray-300">SEC</sub>
        </div>
             {/* Buttons */}
      <div className="sm:flex-row flex-col flex w-full   gap-2 items-center justify-center mt-4">
        <SignInButton fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/onboarding">
          <div className="bg-white/50 w-full rounded-lg shadow-lg backdrop-blur-sm border border-white/30 text-[#fa0053] uppercase p-2 px-4 text-center hover:bg-black/10 transition-colors duration-300 cursor-pointer">
            Join wait list
          </div>
        </SignInButton>

        <Link href="/about" className="w-full">
          <div className="bg-white/50 w-full rounded-lg shadow-lg backdrop-blur-sm border border-white/30 text-[#fa0053] uppercase p-2 px-7 text-center hover:bg-black/10 transition-colors duration-300 cursor-pointer">
            About Us
          </div>
        </Link>
      </div>
      </div>

 

      {/* Loader */}
      {showLoader && (
        <div className={`w-full h-screen flex items-center justify-center bg-white absolute load ${showLoader ? "" : "fade-out"}`}>
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      )}
    </main>
  );
}
