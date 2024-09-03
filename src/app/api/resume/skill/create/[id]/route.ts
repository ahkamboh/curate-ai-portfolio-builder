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
    const body = await req.json();

    const { name } = body;

    // Ensure that all required fields are provided
    if (!name) {
      return NextResponse.json({ error: "Skill name is required" }, { status: 400 });
    }

    // Create the new Skill entry linked to the specific resume
    const newSkill = await prisma.skill.create({
      data: {
        resumeId: resumeId,
        name: name,
      },
    });

    return NextResponse.json(
      { message: "Skill created successfully", skill: newSkill },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
