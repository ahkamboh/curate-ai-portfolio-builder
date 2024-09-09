import { NextResponse } from 'next/server';
import pool from '@/lib/db';

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
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Query the database to fetch the profile by ID
     {/* @ts-ignore */}
    const [rows] = await pool.query<Profile[]>(`SELECT * FROM profiles WHERE id = ?`, [id]);

    // Check if the profile exists
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ profile: rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
