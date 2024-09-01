"use client";

import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs"; // Use Clerk's hooks for client-side authentication
import { useRouter } from "next/navigation";

export default function TestingPage() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState<string>(""); // State to store the resume ID
  const { getToken } = useAuth(); // Get the auth token
  const { user } = useUser(); // Get the user info
  const router = useRouter();

  const fetchResume = async (id: string) => {
    try {
      const token = await getToken();
      console.log("Auth token:", token);

      if (!user) {
        setError("User not authenticated");
        return;
      }

      const res = await fetch(`/api/resume/read/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Use the token for authorization
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(`Error: ${data.error}`);
      } else {
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
      setError("An unexpected error occurred");
    }
  };

  // Use effect to automatically fetch a resume if resumeId is provided
  useEffect(() => {
    if (resumeId) {
      fetchResume(resumeId);
    }
  }, [resumeId]);

  return (
    <div>
      <h1>Testing Specific Resume Read API</h1>
      <input
        type="text"
        placeholder="Enter Resume ID"
        value={resumeId}
        onChange={(e) => setResumeId(e.target.value)}
        className="border p-2 mb-4"
      />
      <button
        onClick={() => fetchResume(resumeId)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Fetch Resume
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response ? (
        <pre>{response}</pre>
      ) : (
        <p>{resumeId ? "Fetching resume..." : "Enter a resume ID to fetch data"}</p>
      )}
    </div>
  );
}
