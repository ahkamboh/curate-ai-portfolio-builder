import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate the user
    const { userId: clerkUserId } = auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const resumeId = params.id;
    const { title, template, colorScheme, fontStyle } = await req.json();

    // Update the resume with the provided data
    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        title,
        template,
        colorScheme,
        fontStyle,
      },
    });

    return NextResponse.json(
      { message: "Resume updated successfully", resume: updatedResume },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
