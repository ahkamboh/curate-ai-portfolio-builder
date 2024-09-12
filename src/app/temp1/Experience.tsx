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
    description: "Responsible for designing user-centric products and interfaces, focusing on enhancing user experience and creating design systems."
  },
  {
    title: "UI/UX Designer",
    period: "2021 - 2023",
    company: "Google",
    description: "Led multiple user experience design projects, collaborating closely with engineers and product managers to deliver user-focused solutions."
  },
  {
    title: "Senior Product Designer",
    period: "2019 - 2021",
    company: "Airbnb",
    description: "Directed the redesign of core booking features, improving the overall customer journey and increasing engagement by 30%."
  },
  {
    title: "Graphic Designer",
    period: "2017 - 2019",
    company: "Adobe",
    description: "Created branding materials, marketing campaigns, and visual assets, playing a key role in brand strategy development."
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
