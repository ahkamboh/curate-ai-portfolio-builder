import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate the user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const resumeId = params.id;

    // Delete the resume directly
    const deletedResume = await prisma.resume.delete({
      where: { id: resumeId },
    });

    return NextResponse.json(
      { message: "Resume deleted successfully", resume: deletedResume },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting resume:", error);

    // Check if the error is an instance of Prisma.PrismaClientKnownRequestError
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // P2025 is the Prisma error code for "Record not found"
        return NextResponse.json(
          { error: "Resume not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
