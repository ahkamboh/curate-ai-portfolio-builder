"use client";
import React, { useState, useEffect } from 'react';
import JobAccordion from '@/components/JobAccordion';

interface EducationProps {
  onEducationDataChange: (education: any) => void; // Callback to pass data to parent
}

const initialEducation = [
  {
    title: "Product Designer",
    period: "2023 - Present",
    company: "Figma",
    description: "Responsible for designing user-centric products and interfaces."
  },
  {
    title: "UI/UX Designer",
    period: "2021 - 2022",
    company: "Google",
    description: "Focused on creating intuitive and visually appealing user interfaces."
  },
  {
    title: "Senior Product Designer",
    period: "2020 - 2021",
    company: "Airbnb",
    description: "Led the redesign of the booking Education, enhancing user engagement and streamlining the booking process."
  },
  {
    title: "Graphic Designer",
    period: "2018 - 2020",
    company: "Adobe",
    description: "Developed creative concepts and designs for digital and print media, including branding, marketing materials, and user guides."
  }
];

const Education: React.FC<EducationProps> = ({ onEducationDataChange }) => {
  const [education, setEducation] = useState(initialEducation);

  // Pass education data to the parent component whenever it changes
  useEffect(() => {
    onEducationDataChange(education);
  }, [education]);

  return (
    <div className="bg-[#1b1b1b] rounded-xl p-6 w-full text-white border-2 border-neutral-800">
      <div className="text-gray-400 text-lg mb-4">
        <span className="block">•<span>Recent Work</span></span>
      </div>
      <JobAccordion jobs={education} setJobs={setEducation} />
    </div>
  );
};

export default Education;
