import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const resumeId = params.id;

    // Fetch the specific resume by its ID
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
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

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume }, { status: 200 });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
