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

    // Build the data object conditionally
    const data: any = {
      resumeId: resumeId,
      title: body.title,
      location: body.location,
      description: body.description,
      link: body.link || null,
    };

    if (body.date) {
      data.date = new Date(body.date);
    }

    // Create the new Hackathon related to the specific resume
    const newHackathon = await prisma.hackathon.create({
      data: data,
    });

    return NextResponse.json(
      { message: "Hackathon created successfully", hackathon: newHackathon },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating hackathon:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
