"use client"; // Add this directive to specify it's a client-side component

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Define Job type
interface Job {
  title: string;
  period: string;
  company: string;
  description: string;
}
// Define Props for JobAccordion component
interface JobAccordionProps {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void; // Function to update jobs in parent component
}

const JobAccordion: React.FC<JobAccordionProps> = ({ jobs, setJobs }) => {
  const [openIndex, setOpenIndex] = React.useState<number>(0); // Client-side state

  // Function to toggle accordion open/close
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Function to handle changes in job data
  const handleJobChange = (index: number, field: keyof Job, value: string) => {
    const updatedJobs = [...jobs];
    updatedJobs[index][field] = value;
    setJobs(updatedJobs); // Update jobs state in the parent component
  };
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <div key={index} className="overflow-hidden">
          <div
            className="flex justify-between items-start cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <div>
              <h3
                className={`text-xl font-semibold transition-colors duration-300 ${
                  openIndex === index ? 'text-[#e63e21]' : 'text-white'
                }`}
                onBlur={(e) => handleJobChange(index, 'title', e.currentTarget.textContent || '')}
              >
                {job.title}
              </h3>
              <p
                className="text-gray-400"
                onBlur={(e) => handleJobChange(index, 'period', e.currentTarget.textContent || '')}
              >
                {job.period}
              </p>
            </div>
            <div className="flex items-center">
              <span
                className="text-gray-500"
                onBlur={(e) => handleJobChange(index, 'company', e.currentTarget.textContent || '')}
              >
                {job.company}
              </span>
              {openIndex === index ? (
                <ChevronUp className="text-gray-400 transition-transform duration-300" />
              ) : (
                <ChevronDown className="text-gray-400 transition-transform duration-300" />
              )}
            </div>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-2">
              <p
                className="text-gray-300"
                onBlur={(e) => handleJobChange(index, 'description', e.currentTarget.textContent || '')}
              >
                {job.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobAccordion;
