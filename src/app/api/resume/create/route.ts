import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Use auth() for App Router
    const { userId, sessionId, orgId } = auth();
    console.log("Auth details:", { userId, sessionId, orgId });

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { title, template, colorScheme, fontStyle } = await req.json();

    if (!title || !template || !colorScheme || !fontStyle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure the user exists
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create the resume
    const resume = await prisma.resume.create({
      data: {
        title,
        template,
        colorScheme,
        fontStyle,
        userId: user.id, // Associate the resume with the user
      },
    });

    return NextResponse.json(
      { message: "Resume created successfully", resume },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
