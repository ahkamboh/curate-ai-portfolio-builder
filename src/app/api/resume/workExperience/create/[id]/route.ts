import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const resumeId = params.id;
    const { companyName, startDate, endDate, position, description } = await req.json();

    if (!companyName || !startDate || !position || !description) {
      return NextResponse.json({ error: "All fields except endDate are required" }, { status: 400 });
    }

    // Create a new WorkExperience linked to the specific resume
    const newWorkExperience = await prisma.workExperience.create({
      data: {
        resumeId,
        companyName,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        position,
        description,
      },
    });

    return NextResponse.json({ message: "Work experience created successfully", workExperience: newWorkExperience }, { status: 201 });
  } catch (error) {
    console.error("Error creating work experience:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
