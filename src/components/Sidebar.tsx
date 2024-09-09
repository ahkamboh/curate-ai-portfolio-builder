import React, { useState } from 'react';
import { useClerk } from '@clerk/nextjs'; // Import useClerk hook to access signOut
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for opening/closing sidebar

function SideBar() {
  const { signOut } = useClerk(); // Access signOut from useClerk
  const [isOpen, setIsOpen] = useState(false); // Manage sidebar open/close

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/main'; // Redirect to '/main' after signing out
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="sm:hidden p-4">
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform bg-neutral-700 p-4 flex flex-col justify-between h-screen transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:relative sm:translate-x-0 sm:col-span-2 sm:px-8`}
      >
        {/* Logo and Menu */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-[90px] ClashDisplay-Bold scale-125 tracking-widest">
            <h1>SwiftMail</h1>
            <img src="/gradient.png" alt="gradient" className="w-full relative -top-3.5 -z-20" />
          </div>
          <button className="ClashDisplay-Regular w-full rounded py-1 mt-6 text-white bg-gradient-to-br from-[#f75ad5] bg-cyan-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-[#f75ad5] dark:focus:ring-[#f75ad5] flex gap-2 justify-center items-center">
            <img src="/add.svg" alt="" /> New Project
          </button>
          <div className="p-4 flex flex-col justify-start gap-2 mt-4 w-full">
            <button title="Projects" className="ClashDisplay-Regular flex gap-2 items-center">
              <img src="/project.svg" alt="Project" /> Projects
            </button>
            <button title="Templates" className="ClashDisplay-Regular flex gap-2 items-center">
              <img src="/file.svg" alt="Templates" /> Templates
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            title="Logout"
            className="ClashDisplay-Regular flex gap-2 items-center"
            onClick={handleSignOut} // Call the Clerk sign-out function
          >
            <img src="/logout.svg" alt="Logout" /> Logout
          </button>
        </div>
      </div>

      {/* Overlay for Mobile when Sidebar is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default SideBar;
