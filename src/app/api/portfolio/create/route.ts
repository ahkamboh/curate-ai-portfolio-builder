import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const { name, title, jobs = [], education = [], content = '', imageUrl, status, email, mailtoLink, projects = [], achievements = [] } = await request.json();

  // Validate required fields
  if (!name || !title || jobs.length === 0 || education.length === 0 || projects.length === 0 || achievements.length === 0) {
    return NextResponse.json({ error: 'Name, title, at least one job, education, project, and achievement are required' }, { status: 400 });
  }

  let uploadedProfileImageUrl = imageUrl;

  try {
    // Upload profile image to Cloudinary (if provided)
    if (imageUrl) {
      const uploadResponse = await cloudinary.v2.uploader.upload(imageUrl);
      uploadedProfileImageUrl = uploadResponse.secure_url;
    }

    // Upload each project image to Cloudinary and replace with the secure URL
    const updatedProjects = await Promise.all(
      projects.map(async (project: { imageUrl: string; }) => {
        if (project.imageUrl) {
          const uploadResponse = await cloudinary.v2.uploader.upload(project.imageUrl);
          return { ...project, imageUrl: uploadResponse.secure_url };
        }
        return project;
      })
    );

    // Upload each achievement image to Cloudinary and replace with the secure URL
    const updatedAchievements = await Promise.all(
      achievements.map(async (achievement: { title: string; url: string; }) => {
        if (achievement.url) {
          const uploadResponse = await cloudinary.v2.uploader.upload(achievement.url);
          return { ...achievement, url: uploadResponse.secure_url };
        }
        return achievement;
      })
    );

    // Insert profile data along with the projects[] and achievements[] arrays into the MySQL database
    const [result] = await pool.query(
      `
      INSERT INTO profiles (name, title, jobs, education, content, imageUrl, status, email, mailtoLink, projects, achievements)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [name, title, JSON.stringify(jobs), JSON.stringify(education), content, uploadedProfileImageUrl, status, email, mailtoLink, JSON.stringify(updatedProjects), JSON.stringify(updatedAchievements)]
    );

    return NextResponse.json({ message: 'Profile created successfully', result }, { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}
