"use client";
import React, { useEffect, useState } from "react";
import JobAccordion from "@/components/JobAccordion";
import { useParams } from "next/navigation";

interface Job {
  title: string;
  period: string;
  company: string;
  description: string;
}

const Experience: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { id } = useParams(); // Get profile id from the route

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await fetch(`/api/portfolio/read/${id}`);
        const data = await response.json();
        setJobs(data.profile.jobs); // Set the fetched jobs data
      } catch (error) {
        console.error("Error fetching experience data:", error);
      }
    };

    fetchExperienceData();
  }, [id]);

  if (!jobs.length) return <div>Loading Experience...</div>;

  return (
    <div className="bg-[#1b1b1b] rounded-xl p-6 w-full text-white border-2 border-neutral-800">
      <div className="text-gray-400 text-lg mb-4">
        <span className="block">• Recent Work</span>
      </div>
      {/* Render JobAccordion with the fetched jobs */}
      <JobAccordion jobs={jobs} setJobs={function (jobs: Job[]): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
};

export default Experience;
