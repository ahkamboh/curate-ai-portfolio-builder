"use client"; // For Next.js client-side rendering
import React from "react";
import Link from "next/link"; // Import Next.js Link component
import Heading from "./Heading";

interface Project {
  projectLink: string;
  title: string;
  imageUrl: string;
  description: string;
}

interface ProjectsProps {
  projectsData: Project[]; // Receiving projectsData as a prop
}

const Projects: React.FC<ProjectsProps> = ({ projectsData }) => {
  if (!projectsData.length) return <div>No Projects Available</div>; // Handle empty projects data

  return (
    <div className="w-full h-fit">
      <Heading heading="Projects" />
      {projectsData.map((project, index) => (
        <div key={index}>
          <div className="cursor-pointer bg-[#1b1b1b] h-full border-2 border-neutral-800 mt-5 rounded-xl p-6 text-white relative transition-colors">
            {/* Card Title */}
            <div>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-400 mt-1">{project.description}</p>
            </div>
            {/* Arrow Icon */}
            <Link href={project.projectLink} className="absolute top-6 right-6">
              <div
                className="flex items-center justify-center bg-[#e63e21] hover:bg-transparent transition-all duration-300 border-2 border-[#e63e21] p-2 rounded-full cursor-pointer"
              >
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.7088 1.51516L14.3823 12.8096M13.7088 1.51516L2.41434 2.18869M13.7088 1.51516L1.31773 15.4778" stroke="#FDFDFD" strokeWidth="2.40017" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
            {/* Image Display */}
            <div className="mt-8 flex justify-center">
              <div className="h-44 w-full">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
