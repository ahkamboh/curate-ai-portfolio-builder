"use client"
import { useState } from 'react';

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('Yearly'); // Default to yearly

    return (
        <div className="bg-white bg-curate py-16 justify-center px-4 ">
            {/* Title Section */}
            <div className="text-center mb-12 flex flex-col justify-center items-center">
            <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center w-full space-y-6 lg:space-y-0">
        {/* Left side with heading and paragraph */}
        <div className="flex flex-col space-y-4 lg:w-1/2">
          <h2 className="text-[#1B1B1B] poppins-semibold font-semibold text-[28px] sm:text-[36px] md:text-[40px] lg:text-[45px] leading-tight">
            <span className="pr-3">The full suite of portfolio solutions </span>
            <span className=" relative w-fit"> <span className="z-20 relative">Level up with AI.</span>
              <span className="absolute  bottom-0  left-0   w-full ">
                <svg viewBox="0 0 421 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.00045 9.36813C76.3163 4.57455 232.812 -0.419442 418.009 7.91029" stroke="url(#paint0_linear_3372_10669)" stroke-width="6" stroke-linecap="round" />
                  <defs>
                    <linearGradient id="paint0_linear_3372_10669" x1="3.04687" y1="2" x2="418.03" y2="4.61457" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#8B95F2" />
                      <stop offset="1" stop-color="#FA6F5C" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </span>
          </h2>
          <p className="text-[#2F2F2F] poppins-medium  text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] opacity-70">
          Choose the plan that suits your needs and scale your digital Presence.
          </p>
        </div>
      </div>

                {/* Billing Cycle Toggle */}
                <div className="mt-8 flex justify-center">
                    <div className="inline-flex border border-gray-300 rounded-full bg-white">
                        <button
                            className={`px-4 py-2 rounded-full ${billingCycle === 'Monthly' ? 'bg-black text-white' : 'text-gray-500'}`}
                            onClick={() => setBillingCycle('Monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full ${billingCycle === 'Yearly' ? 'bg-black text-white' : 'text-gray-500'}`}
                            onClick={() => setBillingCycle('Yearly')}
                        >
                            Yearly
                        </button>
                    </div>
                </div>
            </div>

            {/* Pricing Table */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 ">

                {/* Pricing Cards */}
                {[
                    {
                        name: 'Free',
                        price: billingCycle === 'Yearly' ? '$0/Year' : '$0/Month',
                        features: ['1 Template', 'Custom color', 'Fonts Selection'],
                    },
                    {
                        name: 'Starter',
                        price: billingCycle === 'Yearly' ? '$5/Year' : '$2/Month',
                        features: ['10 Template', 'Custom color', 'Fonts Selection', 'AI Suggestions'],
                    },
                    {
                        name: 'Pro',
                        price: billingCycle === 'Yearly' ? '$10/Year' : '$5/Month',
                        features: ['20 Template', 'Animations', 'Customizable Templates', 'AI Feedback '],
                    },
                    {
                        name: 'Enterprise',
                        price: billingCycle === 'Yearly' ? '$20/Year' : '$10/Month',
                        features: ['Unlimited everything', 'Resume Hosting & Sharing', 'Custom forms', 'AI Powered Suggestions'],
                    },
                ].map((plan, index) => (
                    <div key={index} className="bg-gradient-to-br from-pink-100 to-blue-100 p-6 rounded-lg border text-center">
                        <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
                        <p className="text-4xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#8B95F2] to-[#FA6F5C]">{plan.price}</p>
                        <button className="mt-4 px-6 py-2 bg-gray-900 text-white font-semibold rounded-full">
                            Try 10 month free ↗
                        </button>
                        <ul className="mt-6 space-y-4 text-gray-600 ">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="ml-2">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
