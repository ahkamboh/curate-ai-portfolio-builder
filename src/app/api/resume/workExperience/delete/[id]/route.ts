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

    const workExperienceId = params.id;

    // Delete the WorkExperience linked to the specific resume
    const deletedWorkExperience = await prisma.workExperience.delete({
      where: { id: workExperienceId },
    });

    return NextResponse.json(
      { message: "Work experience deleted successfully", workExperience: deletedWorkExperience },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting work experience:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Work experience not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
