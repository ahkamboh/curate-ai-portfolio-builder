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

    const hackathonId = params.id;

    // Delete the Hackathon entry linked to the specific resume
    const deletedHackathon = await prisma.hackathon.delete({
      where: { id: hackathonId },
    });

    return NextResponse.json(
      { message: "Hackathon deleted successfully", hackathon: deletedHackathon },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting hackathon:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Hackathon not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
