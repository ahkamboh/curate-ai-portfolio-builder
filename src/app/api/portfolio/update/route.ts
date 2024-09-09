import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Assuming you have a database connection setup

export async function PUT(request: Request) {
  try {
    const { profile } = await request.json(); // Parse the request body to get the profile
    const { id, title, jobs } = profile;

    // Validation to check if 'id' exists
    if (!id) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    // Update the profile data in the database
    const [result] = await pool.query(
      `UPDATE profiles SET title = ?, jobs = ? WHERE id = ?`,
      [title, JSON.stringify(jobs), id]
    );

    return NextResponse.json({ message: 'Profile updated successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
