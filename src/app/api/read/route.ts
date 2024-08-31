// src/app/api/read/route.ts
import { NextRequest, NextResponse } from 'next/server';
import client from '../../../lib/db';

export async function GET(request: NextRequest) {
  try {
    const result = await client.query('SELECT * FROM test_table');
    return NextResponse.json({ success: true, data: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 });
  }
}
