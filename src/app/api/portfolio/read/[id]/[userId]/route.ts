import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise'; // Import RowDataPacket type

// Define the Profile interface
interface Profile {
  id: number;
  name: string;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  status: string;
  email: string;
  mailtoLink: string;
  userId: string;
}
export async function GET(request: Request, { params }: { params: { id: string, userId: string } }) {
  const { id, userId } = params;  // Get both id and userId from the route
  try {
    // Query the database to fetch the profile by both ID and userId
    const [rows] = await pool.query<Profile[] & RowDataPacket[]>(`SELECT * FROM profiles WHERE id = ? AND userId = ?`, [id, userId]);

    // Check if the profile exists
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ profile: rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile by ID and userId:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
