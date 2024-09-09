"use client"
import React, { useState } from 'react';
import Navbar from '../temp1/Navbar';
import About from '../temp1/About';
import Experience from '../temp1/Experience';
import Education from '../temp1/Education';
import Projects from '../temp1/Projects';
import Heading from '../temp1/Heading';
import ExpandingImages from '../temp1/ExpandingImages';
import Footer from '../temp1/Footer';
import Contact from '../temp1/Contact';

const Page: React.FC = () => {
  const [profileData, setProfileData] = useState({});
  const [jobsData, setJobsData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [achievementsData, setAchievementsData] = useState<any[]>([]); // Store achievements data

  // Shared form data for "Hire Me" and "Contact Me"
  const [emailBody, setEmailBody] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userURL, setUserURL] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle form submission for profile, jobs, education, projects, and achievements data
  const handleSaveToDB = async () => {
    const dataToSave = {
      ...profileData,
      jobs: jobsData,
      education: educationData,
      projects: projectsData,
      achievements: achievementsData, // Include achievements data
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/portfolio/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        alert('Profile, jobs, education, projects, and achievements data saved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to save data: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving data.');
    }
  };

  return (
    <div className="bg-[#171717] px-4 relative">
      <div className="container mx-auto">
        <Navbar />
        <About
          onProfileDataChange={setProfileData}
          emailBody={emailBody}
          setEmailBody={setEmailBody}
          emailSubject={emailSubject}
          setEmailSubject={setEmailSubject}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userURL={userURL}
          setUserURL={setUserURL}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <div className="md:flex grid w-full gap-5">
          <div className="w-full space-y-5">
            <Experience onJobsDataChange={setJobsData} />
            <Education onEducationDataChange={setEducationData} />
          </div>
          <Projects onProjectsDataChange={setProjectsData} />
        </div>
        <Heading heading="Achievements" />
        <ExpandingImages onAchievementsDataChange={setAchievementsData} />
        <Contact
          emailBody={emailBody}
          setEmailBody={setEmailBody}
          emailSubject={emailSubject}
          setEmailSubject={setEmailSubject}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userURL={userURL}
          setUserURL={setUserURL}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <Footer />
        {/* Add the Save button */}
        <div className="text-center mt-5 fixed bottom-5 right-5">
          <button
            onClick={handleSaveToDB}
            className="bg-[#e63e21] text-white py-2 px-6 rounded-full"
          >
            Save All Data to DB
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
