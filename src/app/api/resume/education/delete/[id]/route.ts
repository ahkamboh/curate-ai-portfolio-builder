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

    const educationId = params.id;

    // Delete the Education entry linked to the specific resume
    const deletedEducation = await prisma.education.delete({
      where: { id: educationId },
    });

    return NextResponse.json(
      { message: "Education entry deleted successfully", education: deletedEducation },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting education entry:", error);

    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Education entry not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
