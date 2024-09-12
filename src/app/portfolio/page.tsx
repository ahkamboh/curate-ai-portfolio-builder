"use client"; // Ensure this is at the top

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import confetti from "canvas-confetti";
import Navbar from "../temp1/Navbar";
import About from "../temp1/About";
import Experience from "../temp1/Experience";
import Education from "../temp1/Education";
import Projects from "../temp1/Projects";
import Heading from "../temp1/Heading";
import ExpandingImages from "../temp1/ExpandingImages";
import Footer from "../temp1/Footer";
import Contact from "../temp1/Contact";
import Link from "next/link";

const Page: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [profileData, setProfileData] = useState<any>({});
  const [jobsData, setJobsData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [achievementsData, setAchievementsData] = useState<any[]>([]);
  const [font, setFont] = useState("Poppins");
  const [isSaving, setIsSaving] = useState(false);
  const [isLivePopupVisible, setIsLivePopupVisible] = useState(false);
  const [liveLink, setLiveLink] = useState("");
  const [showLiveButton, setShowLiveButton] = useState(false); // To conditionally show the "Show Live Link" button
  const [copyText, setCopyText] = useState("Copy Link"); // State for copy button text

  // Contact form state
  const [emailBody, setEmailBody] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userURL, setUserURL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactHeading, setContactHeading] = useState("");
  const [contactDescription, setContactDescription] = useState("");
  const [contactLink, setContactLink] = useState("");

  const [socialLinks, setSocialLinks] = useState({
    githubLink: "https://github.com/",
    linkedinLink: "https://linkedin.com/in/",
    instagramLink: "https://www.instagram.com/",
    twitterLink: "https://twitter.com/",
  });

  const handleSocialLinksChange = (newLinks: typeof socialLinks) => {
    setSocialLinks(newLinks);
  };

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handleSaveToDB = async () => {
    setIsSaving(true);
    const updatedProjects = projectsData.map((project) => ({
      ...project,
      projectLink: project.projectLink || "#",
    }));

    const dataToSave = {
      ...profileData,
      jobs: jobsData,
      education: educationData,
      projects: updatedProjects,
      achievements: achievementsData,
      contactHeading,
      contactDescription,
      contactLink,
      font,
      userId: user?.id,
      ...socialLinks,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/portfolio/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        const result = await response.json();
        const portfolioId = result.id;

        // Instead of redirecting, display the live link in a popup and trigger confetti
        const liveLink = `https://curateai.online/portfolio/${portfolioId}/${user?.id}`;
        setLiveLink(liveLink);
        setIsLivePopupVisible(true);
        triggerConfetti(); // Trigger confetti animation
        setShowLiveButton(true); // Show "Show Live Link" button after generation
      } else {
        const errorData = await response.json();
        alert(`Failed to save data: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving data.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShowLiveLink = () => {
    setIsLivePopupVisible(true);
    triggerConfetti(); // Show confetti when the live link button is clicked
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(liveLink);
    setCopyText("Copied!"); // Change text to "Copied!" after copying
    setTimeout(() => setCopyText("Copy Link"), 2000); // Reset to "Copy Link" after 2 seconds
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#171717", fontFamily: font }}>
      <div className="container mx-auto px-4 relative pb-16">
        {/* Color and Font Changer */}
        <div className="flex justify-between border-t-2 border-[#262626] items-center fixed z-30 w-full px-7 bottom-0 right-0 p-2 bg-[#1b1b1b] text-white">
          <div className="flex items-center gap-2">
            <select
              id="fontPicker"
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="p-2 rounded-md bg-[#292929]"
            >
              <option value="Poppins">Poppins</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
              <option value="Georgia">Georgia</option>
              <option value="Mixcase">Mixcase</option>
            </select>
          </div>
          <div className="text-center flex gap-2">
            <button
              onClick={handleSaveToDB}
              className="bg-[#e63e21] text-white py-2 px-6 rounded-md"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Generate"}
            </button>
            {showLiveButton && (
              <button
                onClick={handleShowLiveLink}
                className="bg-[#4caf50] text-white py-2 px-6 rounded-md"
              >
                Show Live Link
              </button>
            )}
          </div>
        </div>

        {isSaving && (
          <div className="bg-black/70 z-50 justify-center items-center flex fixed inset-0 w-full h-full">
            <div className="relative flex w-64 animate-pulse gap-2 p-4 mx-auto mt-10">
              <div className="h-12 w-12 rounded-full bg-slate-400"></div>
              <div className="flex-1">
                <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
              </div>
              <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
            </div>
          </div>
        )}

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
          contactHeading={contactHeading}
          setContactHeading={setContactHeading}
          contactDescription={contactDescription}
          setContactDescription={setContactDescription}
          contactLink={contactLink}
          setContactLink={setContactLink}
        />
        <Footer socialLinks={socialLinks} onSocialLinksChange={handleSocialLinksChange} />

        {/* Live link popup */}
        {/* {isLivePopupVisible && ( */}
          <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
            <div className="bg-[#2c2c2c] border border-neutral-800 rounded-md p-6  text-center">
              <h2 className="text-lg font-bold">Your Portfolio is Live!</h2>
              <p className="text-sm mt-2">
                Click the link below to view it live or copy it to share with others:
              </p>
              <Link href={liveLink} target="_blank" className="text-blue-500 bg-gray-800 p-1 px-3 rounded-md hover:underline mt-4">
                {liveLink}
              </Link>
              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={handleCopyToClipboard}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  {copyText}
                </button>
                <button
                  onClick={() => setIsLivePopupVisible(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Page;
