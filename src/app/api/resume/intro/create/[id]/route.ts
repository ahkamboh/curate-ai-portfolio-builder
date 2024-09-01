import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
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

    // Create the Intro linked to the specific resume
    const intro = await prisma.intro.create({
      data: {
        content,
        resumeId,
      },
    });

    return NextResponse.json({ message: "Intro created successfully", intro }, { status: 201 });
  } catch (error) {
    console.error("Error creating intro:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
