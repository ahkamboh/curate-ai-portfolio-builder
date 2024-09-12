import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Assuming you have a database connection setup
import { FieldPacket, ResultSetHeader } from 'mysql2';

export async function PUT(request: Request) {
  try {
    const profile = await request.json(); // Parse the request body to get the profile
    const {
      id,
      title,
      jobs,
      education,
      projects,
      achievements,
      contactHeading,
      contactDescription,
      contactLink,
      font,
      githubLink,
      linkedinLink,
      instagramLink,
      twitterLink,
    } = profile;

    // Validation to check if 'id' exists
    if (!id) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    // Prepare the SQL update query
    const updateQuery = `
      UPDATE profiles 
      SET 
        title = ?,
        jobs = ?,
        education = ?,
        projects = ?,
        achievements = ?,
        contactHeading = ?,
        contactDescription = ?,
        contactLink = ?,
        font = ?,
        githubLink = ?,
        linkedinLink = ?,
        instagramLink = ?,
        twitterLink = ?
      WHERE id = ?
    `;

    // Execute the update query with the profile data
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.execute(updateQuery, [
      title,
      JSON.stringify(jobs), // Convert jobs to string as it's stored as JSON
      JSON.stringify(education), // Convert education to string
      JSON.stringify(projects), // Convert projects to string
      JSON.stringify(achievements), // Convert achievements to string
      contactHeading,
      contactDescription,
      contactLink,
      font,
      githubLink,
      linkedinLink,
      instagramLink,
      twitterLink,
      id,
    ]);
    
    // Depending on your library, you may need to access result properties like this:
    if (result?.affectedRows === 0) {
      return NextResponse.json({ error: 'Profile not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
