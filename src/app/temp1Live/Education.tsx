"use client";
import React from "react";
import JobAccordion from "./JobAccordion";

interface Education {
  title: string;
  period: string;
  company: string;
  description: string;
}

interface EducationComponentProps {
  educationData: Education[]; // Expect the education data as a prop
}

const EducationComponent: React.FC<EducationComponentProps> = ({ educationData }) => {
  if (!educationData.length) return <div>No Education Data Available</div>;

  return (
    <div className="bg-[#1b1b1b] rounded-xl p-6 w-full text-white border-2 border-neutral-800">
      <div className="text-gray-400 text-lg mb-4">
        <span className="block">• Education</span>
      </div>
      {/* Render JobAccordion with the passed education data */}
      <JobAccordion
        jobs={educationData}
        setJobs={function (jobs: Education[]): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default EducationComponent;
