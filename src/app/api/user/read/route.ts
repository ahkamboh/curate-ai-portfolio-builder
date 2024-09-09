import { NextResponse } from 'next/server';
import pool from '@/lib/db';  // Adjust the path to your db connection file if needed

// Export the GET method as a named export
export async function GET() {
  try {
    // Query the database to get all users
    const [rows] = await pool.query('SELECT * FROM users');
    return NextResponse.json({ users: rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users from database' }, { status: 500 });
  }
}
