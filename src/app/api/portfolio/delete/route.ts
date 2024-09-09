import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
  }

  try {
    // Delete the profile from the database
    const [result] = await pool.query(`
      DELETE FROM profiles WHERE id = ?
    `, [id]);

    return NextResponse.json({ message: 'Profile deleted successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
}
