"use client";

import React from 'react';
import SideBar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import { useUser, UserButton } from '@clerk/nextjs';
import { FaBars } from 'react-icons/fa'; // Import a hamburger menu icon

function Page() {
  const { user } = useUser(); // Access user information
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // State for managing sidebar open/close

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility

  return (
    <>
      <div className="w-full">
        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden p-4 flex justify-between items-center bg-[#1e1e1e]">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars size={24} />
          </button>
          <div className="ClashDisplay-Regular text-white">
            Welcome, <span>{user?.firstName || 'User'}</span>
          </div>
          <UserButton />
        </div>

        <div className="grid grid-cols-12">
          {/* Sidebar */}
          <div
            className={`fixed sm:relative z-20 bg-neutral-700 transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } sm:translate-x-0 transition-transform duration-300 col-span-2`}
          >
            <SideBar />
          </div>

          {/* Main Content */}
          <div className="col-span-10 sm:col-span-10 bg-[#1e1e1e] w-full min-h-screen">
            <div className="hidden sm:flex justify-between items-center p-2 px-4 border-b">
              {/* Display user's first name if available, else show fallback */}
              <div className="ClashDisplay-Regular text-white">
                Welcome, <span>{user?.firstName || 'User'}</span>
              </div>

              {/* UserButton component from Clerk for user management */}
              <UserButton />
            </div>
            <Dashboard />
          </div>
        </div>

        {/* Overlay for mobile when the sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden"
            onClick={toggleSidebar} // Close sidebar when clicking outside
          />
        )}
      </div>
    </>
  );
}

export default Page;
