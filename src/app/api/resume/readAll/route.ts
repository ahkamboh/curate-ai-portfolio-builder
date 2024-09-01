import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Authenticate the user
    const { userId: clerkUserId } = auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Find the user in your database using the Clerk userId
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch all resumes for the authenticated user
    const resumes = await prisma.resume.findMany({
      where: { userId: user.id }, // Use the unique user ID from your database
      include: {
        intro: true,
        about: true,
        workExperiences: true,
        educations: true,
        skills: true,
        projects: true,
        hackathons: true,
      },
    });

    return NextResponse.json({ resumes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
