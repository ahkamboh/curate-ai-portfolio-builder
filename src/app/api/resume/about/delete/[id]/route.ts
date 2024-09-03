import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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

    // Delete the About section linked to the specific resume
    const deletedAbout = await prisma.about.delete({
      where: { resumeId },
    });

    return NextResponse.json({ message: "About section deleted successfully", about: deletedAbout }, { status: 200 });
  } catch (error: any) {  // Use 'any' to handle the error
    console.error("Error deleting about section:", error);

    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") { 
      return NextResponse.json({ error: "About section not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
