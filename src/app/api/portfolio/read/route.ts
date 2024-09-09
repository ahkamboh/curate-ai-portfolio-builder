import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Fetch all records from the user_profiles table
    const [rows] = await pool.query('SELECT * FROM profiles');
    return NextResponse.json({ profiles: rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
}
