import { NextResponse } from 'next/server';
import pool from '@/lib/db';  // Update this path to your actual db connection file

// This is the named export for the POST method
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse JSON from the request body
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Insert the new user into the database
    const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);

    return NextResponse.json({ message: 'User created successfully', result }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
