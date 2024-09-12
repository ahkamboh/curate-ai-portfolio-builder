import { NextResponse } from 'next/server';
import { PoolConnection } from 'mysql2/promise';
import pool from '@/lib/db';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Interfaces for data structures
interface Job {
  title: string;
  period: string;
  company: string;
  description: string;
}

interface Education {
  title: string;
  period: string;
  company: string;
  description: string;
}

interface Project {
  title: string;
  imageUrl: string;
  description: string;
  projectLink?: string;
}

interface Achievement {
  id: string;
  url: string;
  title: string;
}

interface ProfileData {
  name: string;
  title: string;
  jobs: Job[];
  education: Education[];
  content?: string;
  imageUrl?: string;
  status?: string;
  email: string;
  mailtoLink?: string;
  contactHeading?: string;
  contactDescription?: string;
  contactLink?: string;
  githubLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  twitterLink?: string;
  projects: Project[];
  achievements: Achievement[];
  font: string; // New field for font
  userId: string; // Add userId to associate with Clerk's user
}

// Function to upload a single image to Cloudinary in WebP format
async function uploadImageToCloudinary(url: string): Promise<string | null> {
  if (!url) return null;

  try {
    const response = await cloudinary.v2.uploader.upload(url, {
      resource_type: 'image',
      format: 'webp', // Force WebP format
      timeout: 30000,
    });

    return response.secure_url;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return null;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const profileData: ProfileData = await request.json();

  // Validate required fields
  if (
    !profileData.name ||
    !profileData.title ||
    profileData.jobs.length === 0 ||
    profileData.education.length === 0 ||
    profileData.projects.length === 0 ||
    profileData.achievements.length === 0
  ) {
    return NextResponse.json(
      { error: 'Name, title, at least one job, education, project, and achievement are required' },
      { status: 400 }
    );
  }

  let connection: PoolConnection | null = null;

  try {
    const profileImageUrl = await uploadImageToCloudinary(profileData.imageUrl || '');

    const updatedProjects: Project[] = profileData.projects;
    const updatedAchievements: Achievement[] = profileData.achievements;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [result]: any = await connection.query(
      `
      INSERT INTO profiles (userId, name, title, jobs, education, content, imageUrl, status, email, mailtoLink, contactHeading, contactDescription, contactLink, githubLink, instagramLink, linkedinLink, twitterLink, projects, achievements, font)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        profileData.userId, // Save the userId from Clerk
        profileData.name,
        profileData.title,
        JSON.stringify(profileData.jobs),
        JSON.stringify(profileData.education),
        profileData.content || '',
        profileImageUrl,
        profileData.status || '',
        profileData.email,
        profileData.mailtoLink || '',
        profileData.contactHeading || '',
        profileData.contactDescription || '',
        profileData.contactLink || '',
        profileData.githubLink || '',
        profileData.instagramLink || '',
        profileData.linkedinLink || '',
        profileData.twitterLink || '',
        JSON.stringify(updatedProjects),
        JSON.stringify(updatedAchievements),
        profileData.font,
      ]
    );

    const insertedId = result.insertId;
    await connection.commit();

    return NextResponse.json({ message: 'Profile created successfully', id: insertedId }, { status: 201 });
  } catch (error) {
    if (connection) await connection.rollback();
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
