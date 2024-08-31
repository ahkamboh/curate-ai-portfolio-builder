import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log("API route /api/user/create hit");

    // Get user info from Clerk
    const { userId } = getAuth(req);

    console.log("userId from Clerk:", userId);

    if (!userId) {
      console.log("User not authenticated");
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Check if the user already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return NextResponse.json({ message: 'User already exists' }, { status: 200 });
    }

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
      },
    });

    console.log("User created successfully:", newUser);

    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
