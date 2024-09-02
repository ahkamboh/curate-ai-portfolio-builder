// pages/index.js

"use client"; // Add this directive at the top

import React from 'react';

export default function Home() {
  const handleLinkedInLogin = () => {
    window.location.href = '/api/auth/linkedin';
  };

  return (
    <div>
      <h1>LinkedIn Profile Fetch Example</h1>
      <button onClick={handleLinkedInLogin}>Login with LinkedIn</button>
    </div>
  );
}
