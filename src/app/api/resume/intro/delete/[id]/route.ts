import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const resumeId = params.id;

    // Delete the Intro linked to the specific resume
    const deletedIntro = await prisma.intro.delete({
      where: { resumeId },
    });

    return NextResponse.json({ message: "Intro deleted successfully", intro: deletedIntro }, { status: 200 });
  } catch (error) {
    console.error("Error deleting intro:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") { 
      // P2025 is the Prisma error code for "Record not found"
      return NextResponse.json({ error: "Intro not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
