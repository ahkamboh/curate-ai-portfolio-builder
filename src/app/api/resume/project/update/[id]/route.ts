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

    const projectId = params.id;
    const body = await req.json();

    // Build the data object to update, including only fields that are present in the request body
    const dataToUpdate: { [key: string]: any } = {};
    if (body.title !== undefined) dataToUpdate.title = body.title;
    if (body.description !== undefined) dataToUpdate.description = body.description;
    if (body.technologies !== undefined) dataToUpdate.technologies = body.technologies;
    if (body.startDate !== undefined) dataToUpdate.startDate = new Date(body.startDate);
    if (body.endDate !== undefined) dataToUpdate.endDate = body.endDate ? new Date(body.endDate) : null;
    if (body.link !== undefined) dataToUpdate.link = body.link;

    // Update the Project entry linked to the specific resume
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: dataToUpdate,
    });

    return NextResponse.json(
      { message: "Project updated successfully", project: updatedProject },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating project:", error);

    if (error.code === "P2025") { // Prisma error code for record not found
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
