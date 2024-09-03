import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const resumeId = params.id;
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // Update the About section linked to the specific resume
    const updatedAbout = await prisma.about.update({
      where: { resumeId },
      data: { content },
    });

    return NextResponse.json({ message: "About section updated successfully", about: updatedAbout }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating about section:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "About section not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
