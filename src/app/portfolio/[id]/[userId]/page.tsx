"use client";
import React, { useEffect, useState } from "react";
import Navbar from '../../../temp1Live/Navbar';
import About from '../../../temp1Live/About';
import Experience from '../../../temp1Live/Experience';
import Education from '../../../temp1Live/Education';
import Projects from '../../../temp1Live/Projects';
import Heading from '../../../temp1Live/Heading';
import ExpandingImages from '../../../temp1Live/ExpandingImages';
import Footer from '../../../temp1Live/Footer';
import Contact from '../../../temp1Live/Contact';
import { useParams } from 'next/navigation';

function Page() {
  const { id, userId } = useParams(); // Get the profile id and user id from the route
  const [profileData, setProfileData] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [achievementsData, setAchievementsData] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [font, setFont] = useState('Poppins'); // Default font

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/portfolio/read/${id}/${userId}`); // Fetch based on portfolio id and user id
        const data = await response.json();
        
        setProfileData(data.profile);
        setJobsData(data.profile.jobs);
        setEducationData(data.profile.education);
        setProjectsData(data.profile.projects);
        setAchievementsData(data.profile.achievements);
        
        setSocialLinks({
          githubLink: data.profile.githubLink,
          linkedinLink: data.profile.linkedinLink,
          instagramLink: data.profile.instagramLink,
          twitterLink: data.profile.twitterLink,
        });
        
        setContactInfo({
          contactHeading: data.profile.contactHeading,
          contactDescription: data.profile.contactDescription,
          contactLink: data.profile.contactLink,
        });

        if (data.profile.font) {
          setFont(data.profile.font);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (id && userId) {
      fetchProfileData();
    }
  }, [id, userId]);

  if (!profileData) {
    return <div className="h-screen flex w-full text-center justify-center items-center">

<div className="animate-pulse flex flex-col items-center justify-center gap-4 w-60">
  <div>
    <div className="w-48 h-6 bg-slate-400 rounded-md"></div>
    <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
  </div>
  <div className="h-7 bg-slate-400 w-full rounded-md"></div>
  <div className="h-7 bg-slate-400 w-full rounded-md"></div>
  <div className="h-7 bg-slate-400 w-full rounded-md"></div>
  <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
</div>
    </div>; 
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#171717', fontFamily: font }}>
      <div className="container mx-auto">
        <Navbar />
        <About profileData={profileData} />
        <div className="md:flex grid mt-5 w-full gap-5">
          <div className="w-full space-y-5">
            <Experience jobsData={jobsData} />
            <Education educationData={educationData} />
          </div>
          <Projects projectsData={projectsData} />
        </div>
        <Heading heading="Hackathons" />
        <ExpandingImages achievementsData={achievementsData} />
        <Contact contactInfo={contactInfo} />
        <Footer socialLinks={socialLinks} />
      </div>
    </div>
  );
}

export default Page;
