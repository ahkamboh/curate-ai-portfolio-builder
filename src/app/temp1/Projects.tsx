import React, { useState, useRef } from 'react';
import Heading from './Heading';

interface ProjectCardProps {
  title: string;
  description: string;
  altText: string;
  onProjectChange: (field: string, value: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, altText, onProjectChange }) => {
  const [uploadedImage, setUploadedImage] = useState<string>(''); // State for uploaded project image
  const [projectLink, setProjectLink] = useState<string>(''); // Project link
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Toggle modal

  const titleRef = useRef<HTMLHeadingElement>(null); // Ref for title
  const descriptionRef = useRef<HTMLParagraphElement>(null); // Ref for description

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setUploadedImage(imageData); // Set the uploaded image
        onProjectChange('imageUrl', imageData); // Pass the image to parent
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle content change for title and description
  const handleContentChange = (field: string) => {
    const newValue = field === 'title' ? titleRef.current?.textContent || '' : descriptionRef.current?.textContent || '';
    onProjectChange(field, newValue); // Pass the updated value to parent
  };

  // Toggle the modal form for project link
  const handleIconClick = () => setIsModalOpen(true);

  // Close the modal form
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle the form submission without redirecting
  const handleFormSubmit = () => setIsModalOpen(false);

  // Handle the project URL input change
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setProjectLink(link);
    onProjectChange('projectLink', link); // Pass the link to parent
  };

  // Redirect to project link on double click
  const handleDoubleClick = () => {
    if (projectLink) {
      window.open(projectLink, '_blank'); // Open link in a new tab
    }
  };

  return (
    <div className="bg-[#1b1b1b] h-full border-2 border-neutral-800 mt-5 rounded-xl p-6 text-white relative">
      {/* Card Title */}
      <div>
        <h2
          className="text-xl font-semibold w-fit"
          contentEditable
          ref={titleRef}
          onBlur={() => handleContentChange('title')}
        >
          {title}
        </h2>
        <p
          className="text-gray-400 mt-1 w-fit"
          contentEditable
          ref={descriptionRef}
          onBlur={() => handleContentChange('description')}
        >
          {description}
        </p>
      </div>

      {/* Arrow Icon - to trigger the pop-up modal */}
      <div className="absolute top-6 right-6">
        <div
          onClick={handleIconClick} // Show modal on click
          onDoubleClick={handleDoubleClick} // Redirect on double-click
          className="flex items-center justify-center bg-[#e63e21] hover:bg-transparent transition-all duration-300 border-2 border-[#e63e21] p-2 rounded-full cursor-pointer"
        >
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7088 1.51516L14.3823 12.8096M13.7088 1.51516L2.41434 2.18869M13.7088 1.51516L1.31773 15.4778" stroke="#FDFDFD" strokeWidth="2.40017" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Modal Pop-up for entering project link */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#1b1b1b] border-2 border-neutral-800 p-6 rounded-lg">
            <h3 className="text-white mb-4">Enter Project Link</h3>
            <input
              type="text"
              placeholder="Project URL"
              value={projectLink}
              onChange={handleLinkChange}
              className="w-full mb-2 p-2 bg-[#2c2c2c] border border-neutral-800 rounded-md text-white"
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-600 text-white rounded-md">Cancel</button>
              <button onClick={handleFormSubmit} className="px-4 py-2 bg-[#e63e21] text-white rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Rectangular Project Image Upload */}
      <div className="mt-8 flex justify-center">
        <div className="h-44 w-full relative cursor-pointer">
          <img
            src={uploadedImage || 'https://www.imgacademy.com/sites/default/files/ncsa-homepage-row-2022.jpg'}
            alt={altText}
            className="w-full h-full object-cover rounded-lg"
          />
          <label className="absolute inset-0  flex justify-center items-center bg-black/50 rounded-lg cursor-pointer">
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
      </div>
    </div>
  );
};

// Projects component to handle multiple projects
const Projects: React.FC<{ onProjectsDataChange: (projects: any[]) => void }> = ({ onProjectsDataChange }) => {
  const [projectsData, setProjectsData] = useState([
    { title: 'AI Music Product', description: 'UX Case Study',  imageUrl: 'https://www.imgacademy.com/sites/default/files/ncsa-homepage-row-2022.jpg' },
    { title: 'AI Music Product', description: 'UX Case Study',  imageUrl: 'https://www.imgacademy.com/sites/default/files/ncsa-homepage-row-2022.jpg' }
  ]);

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...projectsData];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjectsData(updatedProjects);
    onProjectsDataChange(updatedProjects); // Notify parent about project changes
  };

  return (
    <div className="w-full h-fit">
      <Heading heading="Projects" />

      {projectsData.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          altText={project.title}
          onProjectChange={(field, value) => handleProjectChange(index, field, value)}
        />
      ))}
    </div>
  );
};

export default Projects;
