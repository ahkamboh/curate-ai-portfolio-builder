import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const projectId = params.id;

    // Delete the Project linked to the specific resume
    const deletedProject = await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json(
      { message: "Project deleted successfully", project: deletedProject },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting project:", error);

    if (error.code === "P2025") { // Prisma error code for record not found
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
