"use client";
import React, { useEffect, useState } from "react";
import JobAccordion from "@/components/JobAccordion";
import { useParams } from "next/navigation";

interface Education {
  title: string;
  period: string;
  company: string;
  description: string;
}

const EducationComponent: React.FC = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const { id } = useParams(); // Get profile id from the route

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch(`/api/portfolio/read/${id}`);
        const data = await response.json();
        setEducation(data.profile.education); // Set the fetched education data
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };

    fetchEducationData();
  }, [id]);

  if (!education.length) return <div>Loading Education...</div>;

  return (
    <div className="bg-[#1b1b1b] rounded-xl p-6 w-full text-white border-2 border-neutral-800">
      <div className="text-gray-400 text-lg mb-4">
        <span className="block">• Education</span>
      </div>
      {/* Render JobAccordion with the fetched education data */}
       {/* @ts-ignore */}
      <JobAccordion jobs={education} setJobs={function (jobs: Job[]): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
};

export default EducationComponent;
