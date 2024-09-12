"use client";
import React, { useState, useEffect } from 'react';
import JobAccordion from '@/components/JobAccordion';

interface EducationProps {
  onEducationDataChange: (education: any) => void; // Callback to pass data to parent
}

const initialEducation = [
  {
    title: "BS in Computer Science",
    period: "2017 - 2021",
    company: "Stanford University",
    description: "Focused on software engineering, algorithms, and user-centered design."
  },
  {
    title: "MS in Human-Computer Interaction",
    period: "2021 - 2023",
    company: "Carnegie Mellon University",
    description: "Specialized in UI/UX design, human-centered computing, and prototyping."
  },
  {
    title: "UI/UX Design Certification",
    period: "2020",
    company: "Interaction Design Foundation",
    description: "Completed a professional certification in UI/UX design, covering design systems, prototyping, and usability testing."
  },
  {
    title: "Graphic Design Diploma",
    period: "2018 - 2020",
    company: "Rhode Island School of Design",
    description: "Learned foundational graphic design concepts, branding, and typography."
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
        <span className="block">•<span>Recent Education</span></span>
      </div>
      <JobAccordion jobs={education} setJobs={setEducation} />
    </div>
  );
};

export default Education;
