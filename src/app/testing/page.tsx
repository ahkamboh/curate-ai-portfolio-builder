"use client";

import { useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs"; // Use Clerk's hooks for client-side authentication
import { useRouter } from "next/navigation";

export default function TestingPage() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState<string>(""); // State to store the resume ID
  const [title, setTitle] = useState<string>(""); // State for title
  const [template, setTemplate] = useState<string>(""); // State for template
  const [colorScheme, setColorScheme] = useState<string>(""); // State for color scheme
  const [fontStyle, setFontStyle] = useState<string>(""); // State for font style
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

  const updateResume = async (id: string) => {
    try {
      const token = await getToken();
      console.log("Auth token:", token);

      if (!user) {
        setError("User not authenticated");
        return;
      }

      const res = await fetch(`/api/resume/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token for authorization
        },
        body: JSON.stringify({
          title,
          template,
          colorScheme,
          fontStyle,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(`Error: ${data.error}`);
      } else {
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error("Error updating resume:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      <h1>Testing Resume Read and Update API</h1>
      <input
        type="text"
        placeholder="Enter Resume ID"
        value={resumeId}
        onChange={(e) => setResumeId(e.target.value)}
        className="border p-2 mb-4"
      />
      <button
        onClick={() => fetchResume(resumeId)}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Fetch Resume
      </button>

      <h2>Update Resume Fields</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Template"
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        className="border p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Color Scheme"
        value={colorScheme}
        onChange={(e) => setColorScheme(e.target.value)}
        className="border p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Font Style"
        value={fontStyle}
        onChange={(e) => setFontStyle(e.target.value)}
        className="border p-2 mb-4"
      />
      <button
        onClick={() => updateResume(resumeId)}
        className="bg-green-500 text-white p-2 rounded"
      >
        Update Resume
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {response ? (
        <pre>{response}</pre>
      ) : (
        <p>
          {resumeId ? "Fetching resume..." : "Enter a resume ID to fetch data"}
        </p>
      )}
    </div>
  );
}
