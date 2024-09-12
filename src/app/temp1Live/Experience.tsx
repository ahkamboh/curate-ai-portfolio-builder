"use client";
import React from "react";
import JobAccordion from "./JobAccordion";

interface Job {
  title: string;
  period: string;
  company: string;
  description: string;
}

interface ExperienceProps {
  jobsData: Job[]; // Expect the jobs data as a prop
}

const Experience: React.FC<ExperienceProps> = ({ jobsData }) => {
  if (!jobsData.length) return <div>No Experience Data Available</div>;

  return (
    <div className="bg-[#1b1b1b] rounded-xl p-6 w-full text-white border-2 border-neutral-800">
      <div className="text-gray-400 text-lg mb-4">
        <span className="block">• Recent Work</span>
      </div>
      {/* Render JobAccordion with the passed jobs data */}
      <JobAccordion
        jobs={jobsData}
        setJobs={function (jobs: Job[]): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default Experience;
