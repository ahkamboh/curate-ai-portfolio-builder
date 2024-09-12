"use client"; // Ensure this is at the top

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Import Clerk's hook to get the user
import Navbar from "../../../../temp1/Navbar"; // Adjust based on your file structure
import Experience from "../../../../temp1/Experience";
import Education from "../../../../temp1/Education";
import Projects from "../../../../temp1/Projects";
import Heading from "../../../../temp1/Heading";
import ExpandingImages from "../../../../temp1/ExpandingImages";
import Footer from "../../../../temp1/Footer";
import Contact from "../../../../temp1/Contact";
import Aboutupdate from "@/app/temp1/Aboutupdate";

const UpdatePage: React.FC = () => {
  const router = useRouter();
  const { id, userId } = useParams(); // Extract the portfolio id and user id from the route
  const { user } = useUser(); // Get the logged-in user from Clerk

  // State definitions
  const [profileData, setProfileData] = useState<any>({});
  const [jobsData, setJobsData] = useState<any[]>([]);
  const [educationData, setEducationData] = useState<any[]>([]);
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [achievementsData, setAchievementsData] = useState<any[]>([]);
  const [font, setFont] = useState("Poppins");
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Social links state
  const [socialLinks, setSocialLinks] = useState({
    githubLink: "",
    linkedinLink: "",
    instagramLink: "",
    twitterLink: "",
  });

  const [contactHeading, setContactHeading] = useState("");
  const [contactDescription, setContactDescription] = useState("");
  const [contactLink, setContactLink] = useState("");

  // Fetch portfolio data when the page loads
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (!id || !userId) {
          console.error("Missing id or userId");
          return;
        }

        const response = await fetch(`/api/portfolio/read/${id}/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
        }

        const data = await response.json();

        // Pre-fill form with existing portfolio data
        if (data.profile) {
          setProfileData(data.profile);
          setJobsData(data.profile.jobs || []);
          setEducationData(data.profile.education || []);
          setProjectsData(data.profile.projects || []);
          setAchievementsData(data.profile.achievements || []);
          setSocialLinks({
            githubLink: data.profile.githubLink || "",
            linkedinLink: data.profile.linkedinLink || "",
            instagramLink: data.profile.instagramLink || "",
            twitterLink: data.profile.twitterLink || "",
          });
          setContactHeading(data.profile.contactHeading || "");
          setContactDescription(data.profile.contactDescription || "");
          setContactLink(data.profile.contactLink || "");
          setFont(data.profile.font || "Poppins");
        } else {
          console.error("Profile not found in the response");
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    if (id && userId) {
      fetchPortfolio();
    }
  }, [id, userId]);

  // Handle saving updated portfolio to the database
  const handleSaveToDB = async () => {
    setIsSaving(true); // Show loading animation

    const updatedProjects = projectsData.map((project) => ({
      ...project,
      projectLink: project.projectLink || "#",
    }));

    const dataToUpdate = {
      ...profileData,
      jobs: jobsData,
      education: educationData,
      projects: updatedProjects,
      achievements: achievementsData,
      contactHeading,
      contactDescription,
      contactLink,
      font,
      userId: user?.id, // Store the user ID from Clerk
      ...socialLinks, // Include social links in the data to update
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`/api/portfolio/update/${id}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Portfolio updated successfully!");
        // Redirect to the portfolio view page after updating
        router.push(`/portfolio/${id}/${userId}`);
      } else {
        const errorData = await response.json();
        alert(`Failed to update portfolio: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating portfolio:", error);
      alert("An error occurred while updating the portfolio.");
    } finally {
      setIsSaving(false); // Hide loading animation after update completes
    }
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
          <div className="text-center">
            <button
              onClick={handleSaveToDB}
              className="bg-[#e63e21] text-white py-2 px-6 rounded-md"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Update"}
            </button>
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

        {/* Pre-fill with existing data */}
        <Navbar />
        <Aboutupdate
          onProfileDataChange={setProfileData}
          emailBody={profileData.emailBody || ""}
          setEmailBody={(val: string) => setProfileData({ ...profileData, emailBody: val })}
          emailSubject={profileData.emailSubject || ""}
          setEmailSubject={(val: string) => setProfileData({ ...profileData, emailSubject: val })}
          setUserEmail={(val: string) => setProfileData((prevState: any) => ({ ...prevState, email: val }))}
          userURL={profileData.userURL || ""}
          setUserURL={(val: string) => setProfileData({ ...profileData, userURL: val })}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userEmail={profileData.email || ""}
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
        {/* <Contact
          emailBody={profileData.emailBody || ""}
          setEmailBody={(val: string) => setProfileData({ ...profileData, emailBody: val })}
          emailSubject={profileData.emailSubject || ""}
          setEmailSubject={(val: string) => setProfileData({ ...profileData, emailSubject: val })}
          userEmail={profileData.email || ""}
          setUserEmail={(val: string) => setProfileData({ ...profileData, email: val })}
          userURL={profileData.userURL || ""}
          setUserURL={(val: string) => setProfileData({ ...profileData, userURL: val })}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          contactHeading={contactHeading}
          setContactHeading={setContactHeading}
          contactDescription={contactDescription}
          setContactDescription={setContactDescription}
          contactLink={contactLink}
          setContactLink={setContactLink}
        /> */}
        <Footer socialLinks={socialLinks} onSocialLinksChange={setSocialLinks} />
      </div>
    </div>
  );
};

export default UpdatePage;
