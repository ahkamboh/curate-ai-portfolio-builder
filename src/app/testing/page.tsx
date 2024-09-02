"use client";

import { useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs"; // Use Clerk's hooks for client-side authentication
import { useRouter } from "next/navigation";

export default function TestingPage() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState<string>(""); // State to store the resume ID
  const [content, setContent] = useState<string>(""); // State for intro content
  const { getToken } = useAuth(); // Get the auth token
  const { user } = useUser(); // Get the user info
  const router = useRouter();

  const createIntro = async () => {
    try {
      const token = await getToken();
      console.log("Auth token:", token);

      if (!user) {
        setError("User not authenticated");
        return;
      }

      // Hardcode the resume ID or use the one entered by the user
      const hardcodedResumeId = resumeId || "your-hardcoded-resume-id";

      const res = await fetch(`/api/resume/intro/create/${hardcodedResumeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token for authorization
        },
        body: JSON.stringify({
          content, // Pass the intro content
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(`Error: ${data.error}`);
      } else {
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error("Error creating intro:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      <h1>Testing Create Intro API</h1>
      <input
        type="text"
        placeholder="Enter Resume ID"
        value={resumeId}
        onChange={(e) => setResumeId(e.target.value)}
        className="border p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Enter Intro Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 mb-4"
      />
      <button
        onClick={createIntro}
        className="bg-green-500 text-white p-2 rounded"
      >
        Create Intro
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {response ? <pre>{response}</pre> : <p>Enter details to create an intro</p>}
    </div>
  );
}
