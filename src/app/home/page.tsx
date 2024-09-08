"use client";

import React from 'react';
import SideBar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import { useUser, UserButton } from '@clerk/nextjs';

function Page() {
  const { user } = useUser(); // Access user information

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-12">
          <SideBar />
          <div className="col-span-10 bg-[#1e1e1e]">
            <div className="flex justify-between items-center p-2 px-4 border-b">
              {/* Display user's first name if available, else show fallback */}
              <div className="ClashDisplay-Regular">Welcome, <span>{user?.firstName || 'User'}</span></div>
              
              {/* UserButton component from Clerk for user management */}
                <UserButton />
            </div>
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
