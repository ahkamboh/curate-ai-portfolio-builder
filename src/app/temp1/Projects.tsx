import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Heading from './Heading';
import { ImageUp } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  altText: string;
  onProjectChange: (field: string, value: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, altText, onProjectChange  }) => {
  const [uploadedImage, setUploadedImage] = useState<string>('/Promptly.png'); // State for uploaded project image
  const [projectLink, setProjectLink] = useState<string>('#'); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Toggle modal

  const titleRef = useRef<HTMLHeadingElement>(null); // Ref for title
  const descriptionRef = useRef<HTMLParagraphElement>(null); // Ref for description

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop & { aspect?: number }>({ unit: '%', width: 30, height: 0, aspect: 16 / 9, x: 0, y: 0 });
  const [showCropPopup, setShowCropPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for Cloudinary upload
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string); // Show selected image in the crop popup
        setShowCropPopup(true); // Show the cropping modal
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle content change for title and description
  const handleContentChange = (field: string) => {
    const newValue = field === 'title' ? titleRef.current?.textContent || '' : descriptionRef.current?.textContent || '';
    onProjectChange(field, newValue); // Pass the updated value to parent
  };

  // Handle the form submission without redirecting
  const handleFormSubmit = () => setIsModalOpen(false);

  // Handle the project URL input change
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value  || '#';
    setProjectLink(link);
    onProjectChange('projectLink', link); // Pass the link to parent
  };

  // Handle Crop Complete
  const handleCropComplete = (crop: Crop) => {
    setCrop(crop);
  };

  // Upload cropped image to Cloudinary
  const handleUpload = async () => {
    if (imgRef.current && crop.width && crop.height) {
      setIsLoading(true); // Start loading state

      try {
        const croppedImageBlob = await getCroppedImgBlob(imgRef.current, crop);
        const formData = new FormData();
        formData.append('file', croppedImageBlob, 'cropped-image.webp');
        formData.append('upload_preset', 'curate-ai-images');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dhwd1xki6/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setUploadedImage(imageUrl); // Set uploaded image
          onProjectChange('imageUrl', imageUrl); // Notify parent with image URL
          setShowCropPopup(false); // Close cropping popup
        } else {
          const errorData = await response.json();
          alert(`Image upload failed: ${errorData.error?.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image.');
      } finally {
        setIsLoading(false); // Stop loading state
      }
    }
  };

  // Get Cropped Image Blob
  const getCroppedImgBlob = (image: HTMLImageElement, crop: Crop): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );
    }

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(blob);
        },
        'image/webp',
        1
      );
    });
  };

  // Toggle the modal form for project link
  const handleIconClick = () => setIsModalOpen(true);

  // Close the modal form
  const handleCloseModal = () => setIsModalOpen(false);

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
          className="text-xl font-semibold w-fit outline outline-1 outline-slate-400"
          contentEditable
          ref={titleRef}
          onBlur={() => handleContentChange('title')}
        >
          {title}
        </h2>
        <p
          className="text-gray-400 mt-1 w-fit outline outline-1 outline-slate-400"
          contentEditable
          ref={descriptionRef}
          onBlur={() => handleContentChange('description')}
        >
          {description}
        </p>
      </div>

      {/* Arrow Icon - to trigger the pop-up modal and redirect on double-click */}
      <div className="absolute top-6 right-6">
        <div title='click for enter link'
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
            src={uploadedImage}
            alt={altText}
            className="w-full h-full object-cover rounded-lg"
          />
          <label className="absolute inset-0 group flex justify-center items-center bg-black/50 rounded-lg cursor-pointer">
            <input type="file" className="hidden" onChange={handleImageChange} />
            <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                   <ImageUp />
                </div>
          </label>
        </div>
      </div>

      {/* Cropping Popup */}
      {showCropPopup && selectedFile && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-[#1b1b1b] border-2 border-neutral-800 p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={handleCropComplete}
              aspect={16 / 9}
            >
              <img
                ref={imgRef}
                src={selectedFile}
                alt="Crop me"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            </ReactCrop>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setShowCropPopup(false)} className="px-4 py-2 bg-gray-600 rounded">
                Cancel
              </button>
              <button onClick={handleUpload} className="px-4 py-2 bg-[#e63e21] text-white rounded" disabled={isLoading}>
                {isLoading ? (
                  <div className="loader border-t-2 border-white rounded-full w-4 h-4 animate-spin"></div>
                ) : (
                  'Upload'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Projects component to handle multiple projects
const Projects: React.FC<{ onProjectsDataChange: (projects: any[]) => void }> = ({ onProjectsDataChange }) => {
  const [projectsData, setProjectsData] = useState([
    { title: 'Promptly.ai', description: 'AI project just like chatgpt but 20x faster.', imageUrl: 'https://res.cloudinary.com/dhwd1xki6/image/upload/v1726134921/cropped-image_vmjutr.webp' },
    { title: 'Promptly.ai', description: 'AI project just like chatgpt but 20x faster.', imageUrl: 'https://res.cloudinary.com/dhwd1xki6/image/upload/v1726134921/cropped-image_vmjutr.webp' }
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
