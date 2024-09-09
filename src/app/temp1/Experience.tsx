"use client";
import React, { useEffect, useState } from 'react';
import JobAccordion from '@/components/JobAccordion';

interface ExperienceProps {
  onJobsDataChange: (jobs: any) => void; // Callback to pass jobs data to parent
}

const initialJobs = [
  {
    title: "Product Designer",
    period: "2023 - Present",
    company: "Figma",
    description: "Responsible for designing user-centric products and interfaces."
  },
  {
    title: "Product Designer",
    period: "2023 - Present",
    company: "Figma",
    description: "Responsible for designing user-centric products and interfaces."
  },
  {
    title: "Product Designer",
    period: "2023 - Present",
    company: "Figma",
    description: "Responsible for designing user-centric products and interfaces."
  },
  {
    title: "Product Designer",
    period: "2023 - Present",
    company: "Figma",
    description: "Responsible for designing user-centric products and interfaces."
  }
];

const Experience: React.FC<ExperienceProps> = ({ onJobsDataChange }) => {
  const [jobs, setJobs] = useState(initialJobs);

  // Pass jobs data to the parent (Page) component whenever jobs state changes
  useEffect(() => {
    onJobsDataChange(jobs);
  }, [jobs]);

  return (
    <div className="bg-[#1b1b1b] rounded-xl mt-5 p-6 w-full text-white border-2 border-neutral-800">
      <div className="text-gray-400 text-lg mb-4">
        <span className="block">•<span>Recent Work</span></span>
      </div>
      <JobAccordion jobs={jobs} setJobs={setJobs} />
    </div>
  );
};

export default Experience;
