import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Delete all resumes for the authenticated user
    const deletedResumes = await prisma.resume.deleteMany({
      where: { userId: userId },
    });

    return NextResponse.json(
      { message: `${deletedResumes.count} resumes deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting resumes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
