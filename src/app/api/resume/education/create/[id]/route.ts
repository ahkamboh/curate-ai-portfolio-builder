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
    const { institution, degree, startDate, endDate } = await req.json();

    // Create the new Education entry
    const newEducation = await prisma.education.create({
      data: {
        institution,
        degree,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        resume: {
          connect: { id: resumeId },
        },
      },
    });

    return NextResponse.json(
      { message: "Education entry created successfully", education: newEducation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating education entry:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
