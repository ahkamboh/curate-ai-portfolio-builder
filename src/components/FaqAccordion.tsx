"use client"; // Ensures this component is client-side

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Icons for expand/collapse

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Track which accordion is open

  // Function to toggle accordion open/close
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: 'What services does your design agency offer?',
      answer: 'We offer a wide range of design services, including graphic design, web design, branding, logo design, print design, and more. Feel free to explore our portfolio for a comprehensive list of our offerings.',
    },
    {
      question: 'How do I get started with a design project?',
      answer: 'Simply reach out to us via our contact page, and we will set up an initial consultation to discuss your project needs.',
    },
    {
      question: 'How much does your design service cost?',
      answer: 'Our pricing depends on the scope and complexity of the project. We offer a range of packages to suit different needs and budgets.',
    },
    {
      question: 'What is your design process like?',
      answer: 'We follow a structured design process starting with initial consultations, concept creation, feedback loops, and final delivery. You will be involved throughout the entire process.',
    },
  ];

  return (
    <div className="bg-white bg-curate pb-20 px-4">
            <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold  mb-6 text-gray-900 poppins-semibold">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-lg border-gray-200 transition-colors duration-300 bg-[#f7f5f6] `}
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className={`text-lg font-semibold  ${openIndex === index ? 'text-gray-900' : 'text-gray-700'} transition-colors poppins-semiblod`}>
                {faq.question}
              </h3>
              {openIndex === index ? (
                <div className="border rounded-full sm:p-2 p-1 border-gray-500"><ChevronUp className="text-gray-500 " /></div>
                
              ) : (
                <div className="border rounded-full sm:p-2 p-1 border-gray-500"><ChevronDown className="text-gray-500" /></div>
              )}
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-96 p-4' : 'max-h-0'}`}
            >
              <p className="text-gray-600 poppins-medium">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

  );
};

export default FaqAccordion;
