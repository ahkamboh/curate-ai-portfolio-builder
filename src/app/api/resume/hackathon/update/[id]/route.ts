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

    const hackathonId = params.id;
    const body = await req.json();

    // Build the data object to update, including only fields that are present in the request body
    const dataToUpdate: { [key: string]: any } = {};
    if (body.title !== undefined) dataToUpdate.title = body.title;
    if (body.location !== undefined) dataToUpdate.location = body.location;
    if (body.date !== undefined) dataToUpdate.date = body.date ? new Date(body.date) : null;
    if (body.description !== undefined) dataToUpdate.description = body.description;
    if (body.link !== undefined) dataToUpdate.link = body.link || null;

    // Update the Hackathon entry linked to the specific resume
    const updatedHackathon = await prisma.hackathon.update({
      where: { id: hackathonId },
      data: dataToUpdate,
    });

    return NextResponse.json(
      { message: "Hackathon updated successfully", hackathon: updatedHackathon },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating hackathon:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Hackathon not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
