import { Github, Linkedin } from 'lucide-react';
import React, { useState } from 'react';
// Define social links type
interface SocialLinks {
  githubLink: string;
  linkedinLink: string;
  instagramLink: string;
  twitterLink: string;
}
interface FooterProps {
  socialLinks: SocialLinks;
  onSocialLinksChange: (links: SocialLinks) => void;
}
const Footer: React.FC<FooterProps> = ({ socialLinks, onSocialLinksChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState<keyof SocialLinks | ''>('');
  const [currentLink, setCurrentLink] = useState('');

  // Open modal for the specific social media platform
  const openModal = (platform: keyof SocialLinks) => {
    setActivePlatform(platform);
    setCurrentLink(socialLinks[platform]);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (activePlatform) {
      onSocialLinksChange({
        ...socialLinks,
        [activePlatform]: currentLink
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="grid sm:grid-cols-9 gap-5 ">
      <div className="relative col-span-6 my-5 w-full p-[2px] rounded-xl overflow-hidden h-[100px] bg-gradient-to-bl from-neutral-800 via-black to-[#e63e21] ">
        <div className="bg-[#1b1b1b] flex justify-center rounded-xl items-center text-gray-400 text-lg w-full h-24">
          <div className="grid grid-cols-4 gap-5">
            {/* Twitter */}
            <button title='click for enter link' onClick={() => openModal('twitterLink')} className="group">
            <svg
                width="52"
                height="36"
                className="text-white group-hover:text-[#e63e21] transition-colors duration-300"
                viewBox="0 0 52 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="52" height="36" rx="18" fill="#292929" />
                <path
                  d="M27.6175 16.66L33.9463 9.25H32.4463L26.9525 15.6837L22.5625 9.25H17.5L24.1375 18.98L17.5 26.75H19L24.8025 19.955L29.4388 26.75H34.5013L27.6175 16.66ZM25.5638 19.065L24.8913 18.0962L19.54 10.3875H21.8438L26.1613 16.6088L26.8338 17.5775L32.4475 25.665H30.1438L25.5638 19.065Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {/* Linkedin */}
            <button title='click for enter link' onClick={() => openModal('linkedinLink')} className="group">
              <div className="text-white group-hover:text-[#e63e21] transition-colors  duration-300 bg-[#292929] flex justify-center items-center w-[56px] rounded-full h-[36px]">
                <Linkedin strokeWidth={1.25} />
              </div>
            </button>

            {/* Instagram */}
            <button title='click for enter link' onClick={() => openModal('instagramLink')} className="group">
            <svg
                width="52"
                height="36"
                viewBox="0 0 52 36"
                className="text-white group-hover:text-[#e63e21] transition-colors duration-300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="52" height="36" rx="18" fill="#292929" />
                <path
                  d="M26.0007 15.5001C25.3376 15.5001 24.7017 15.7635 24.2329 16.2323C23.7641 16.7012 23.5007 17.337 23.5007 18.0001C23.5007 18.6631 23.7641 19.299 24.2329 19.7678C24.7017 20.2367 25.3376 20.5001 26.0007 20.5001C26.6637 20.5001 27.2996 20.2367 27.7684 19.7678C28.2373 19.299 28.5007 18.6631 28.5007 18.0001C28.5007 17.337 28.2373 16.7012 27.7684 16.2323C27.2996 15.7635 26.6637 15.5001 26.0007 15.5001ZM26.0007 13.8334C27.1057 13.8334 28.1655 14.2724 28.9469 15.0538C29.7284 15.8352 30.1673 16.895 30.1673 18.0001C30.1673 19.1052 29.7284 20.165 28.9469 20.9464C28.1655 21.7278 27.1057 22.1667 26.0007 22.1667C24.8956 22.1667 23.8358 21.7278 23.0544 20.9464C22.273 20.165 21.834 19.1052 21.834 18.0001C21.834 16.895 22.273 15.8352 23.0544 15.0538C23.8358 14.2724 24.8956 13.8334 26.0007 13.8334ZM31.4173 13.6251C31.4173 13.9013 31.3076 14.1663 31.1122 14.3617C30.9169 14.557 30.6519 14.6667 30.3757 14.6667C30.0994 14.6667 29.8345 14.557 29.6391 14.3617C29.4438 14.1663 29.334 13.9013 29.334 13.6251C29.334 13.3488 29.4438 13.0839 29.6391 12.8885C29.8345 12.6932 30.0994 12.5834 30.3757 12.5834C30.6519 12.5834 30.9169 12.6932 31.1122 12.8885C31.3076 13.0839 31.4173 13.3488 31.4173 13.6251ZM26.0007 11.3334C23.939 11.3334 23.6023 11.3392 22.6432 11.3817C21.9898 11.4126 21.5515 11.5001 21.1448 11.6584C20.8045 11.7834 20.4968 11.9836 20.2448 12.2442C19.984 12.4962 19.7835 12.8039 19.6582 13.1442C19.4998 13.5526 19.4123 13.9901 19.3823 14.6426C19.339 15.5626 19.3332 15.8842 19.3332 18.0001C19.3332 20.0626 19.339 20.3984 19.3815 21.3576C19.4123 22.0101 19.4998 22.4492 19.6573 22.8551C19.799 23.2176 19.9657 23.4784 20.2423 23.7551C20.5232 24.0351 20.784 24.2026 21.1423 24.3409C21.554 24.5001 21.9923 24.5884 22.6423 24.6184C23.5623 24.6617 23.884 24.6667 25.9998 24.6667C28.0623 24.6667 28.3982 24.6609 29.3573 24.6184C30.009 24.5876 30.4473 24.5001 30.8548 24.3426C31.1948 24.217 31.5024 24.0168 31.7548 23.7567C32.0357 23.4767 32.2032 23.2159 32.3415 22.8567C32.4998 22.4467 32.5882 22.0084 32.6182 21.3567C32.6615 20.4376 32.6665 20.1151 32.6665 18.0001C32.6665 15.9384 32.6607 15.6017 32.6182 14.6426C32.5873 13.9909 32.499 13.5509 32.3415 13.1442C32.2159 12.8043 32.0157 12.4967 31.7557 12.2442C31.5038 11.9833 31.1961 11.7827 30.8557 11.6576C30.4473 11.4992 30.009 11.4117 29.3573 11.3817C28.4382 11.3384 28.1165 11.3334 25.9998 11.3334M25.9998 9.66675C28.264 9.66675 28.5465 9.67508 29.4357 9.71675C30.3223 9.75841 30.9273 9.89758 31.4582 10.1042C32.0082 10.3159 32.4715 10.6026 32.9348 11.0651C33.3586 11.4817 33.6865 11.9856 33.8957 12.5417C34.1015 13.0726 34.2415 13.6776 34.2832 14.5651C34.3223 15.4534 34.3332 15.7359 34.3332 18.0001C34.3332 20.2642 34.3248 20.5467 34.2832 21.4351C34.2415 22.3226 34.1015 22.9267 33.8957 23.4584C33.687 24.0149 33.3591 24.5189 32.9348 24.9351C32.5181 25.3587 32.0143 25.6865 31.4582 25.8959C30.9273 26.1017 30.3223 26.2417 29.4357 26.2834C28.5465 26.3226 28.264 26.3334 25.9998 26.3334C23.7357 26.3334 23.4532 26.3251 22.564 26.2834C21.6773 26.2417 21.0732 26.1017 20.5415 25.8959C19.9851 25.6871 19.4811 25.3592 19.0648 24.9351C18.641 24.5186 18.3131 24.0146 18.104 23.4584C17.8973 22.9276 17.7582 22.3226 17.7165 21.4351C17.6765 20.5467 17.6665 20.2642 17.6665 18.0001C17.6665 15.7359 17.6748 15.4534 17.7165 14.5651C17.7582 13.6776 17.8973 13.0734 18.104 12.5417C18.3125 11.9852 18.6405 11.4812 19.0648 11.0651C19.4812 10.6411 19.9852 10.3132 20.5415 10.1042C21.0723 9.89758 21.6765 9.75841 22.564 9.71675C23.454 9.67758 23.7365 9.66675 26.0007 9.66675"
                  fill="currentColor"
                />
              </svg>
            </button>

            {/* Github */}
            <button title='click for enter link' onClick={() => openModal('githubLink')} className="group">
              <div className="text-white group-hover:text-[#e63e21] transition-colors  duration-300 bg-[#292929] flex justify-center items-center w-[56px] rounded-full h-[36px]">
                <Github strokeWidth={1.25} />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="relative col-span-3 my-5 w-full p-[2px] rounded-xl overflow-hidden h-[100px] bg-gradient-to-tr  from-neutral-800 via-black sm:block hidden to-[#e63e21] ">
        <div className="bg-[#1b1b1b] flex justify-center rounded-xl items-center text-gray-400 text-lg  w-full h-24">
          <div className="px-6 py-2 gap-3 rounded-full flex justify-center items-center ">
            <span className="h-3 w-3 bg-[#e63e21] rounded-full"></span>
            <span >AVAILABLE FOR Work</span>
          </div>
        </div>
      </div>
      {/* Modal for entering social media link */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center  justify-center bg-black bg-opacity-50">
          <div className="bg-[#1b1b1b] sm:w-96   border-2 border-neutral-800  p-6 rounded-lg">
            <h3 className="text-white mb-4">Enter your {activePlatform} link</h3>
            <input
              type="url"
              placeholder="Social Media Link"
              value={currentLink}
              onChange={(e) => setCurrentLink(e.target.value)}
              className="w-full mb-2 p-2 bg-[#2c2c2c] border border-neutral-800 rounded-md text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#e63e21] text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;