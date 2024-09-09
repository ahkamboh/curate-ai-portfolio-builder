import { NextResponse } from 'next/server';
import { RowDataPacket, PoolConnection } from 'mysql2/promise';
import pool from '@/lib/db';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Increase the request size limit
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};

// Define interfaces for our data structures
interface Job {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationYear: number;
}

interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

interface Achievement {
  title: string;
  description: string;
  url?: string;
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
  projects: Project[];
  achievements: Achievement[];
}

async function uploadToCloudinary(url: string): Promise<string | null> {
  if (!url) return null;
  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(url, {
      resource_type: 'auto',
      timeout: 60000, // 60 seconds timeout
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return null;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const profileData: ProfileData = await request.json();

  // Validate required fields
  if (!profileData.name || !profileData.title || profileData.jobs.length === 0 || 
      profileData.education.length === 0 || profileData.projects.length === 0 || 
      profileData.achievements.length === 0) {
    return NextResponse.json({ error: 'Name, title, at least one job, education, project, and achievement are required' }, { status: 400 });
  }

  let connection: PoolConnection | null = null;

  try {
    // Parallel image uploads
    const [profileImageUrl, ...otherImageUrls] = await Promise.all([
      uploadToCloudinary(profileData.imageUrl || ''),
      ...profileData.projects.map(p => uploadToCloudinary(p.imageUrl || '')),
      ...profileData.achievements.map(a => uploadToCloudinary(a.url || ''))
    ]);

    // Update projects and achievements with new URLs
    const updatedProjects = profileData.projects.map((p, i) => ({ ...p, imageUrl: otherImageUrls[i] || p.imageUrl }));
    const updatedAchievements = profileData.achievements.map((a, i) => ({ 
      ...a, 
      url: otherImageUrls[i + profileData.projects.length] || a.url 
    }));

    // Get a connection from the pool
    connection = await pool.getConnection();

    // Insert profile data into the MySQL database
    const [result] = await connection.query<RowDataPacket[]>(
      `
      INSERT INTO profiles (name, title, jobs, education, content, imageUrl, status, email, mailtoLink, projects, achievements)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        profileData.name,
        profileData.title,
        JSON.stringify(profileData.jobs),
        JSON.stringify(profileData.education),
        profileData.content || '',
        profileImageUrl,
        profileData.status || '',
        profileData.email,
        profileData.mailtoLink || '',
        JSON.stringify(updatedProjects),
        JSON.stringify(updatedAchievements)
      ]
    );

    return NextResponse.json({ message: 'Profile created successfully', result }, { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
}