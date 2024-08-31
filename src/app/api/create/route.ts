// src/app/api/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import client from '../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, phone_number, email, profile_pic } = await request.json();

    if (!name || !phone_number || !email) {
      return NextResponse.json(
        { success: false, error: 'Name, phone number, and email are required' },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO test_table (name, phone_number, email, profile_pic) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const values = [name, phone_number, email, profile_pic];

    const result = await client.query(query, values);
    return NextResponse.json({ success: true, data: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ success: false, error: 'Failed to insert data' }, { status: 500 });
  }
}
