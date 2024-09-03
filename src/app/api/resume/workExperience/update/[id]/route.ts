import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const workExperienceId = params.id;
    const { companyName, startDate, endDate, position, description } = await req.json();

    // Construct the update data object, only including provided fields
    const updateData: Prisma.WorkExperienceUpdateInput = {};

    if (companyName !== undefined) {
      updateData.companyName = companyName;
    }
    if (startDate !== undefined) {
      updateData.startDate = new Date(startDate);
    }
    if (endDate !== undefined) {
      updateData.endDate = new Date(endDate);
    }
    if (position !== undefined) {
      updateData.position = position;
    }
    if (description !== undefined) {
      updateData.description = description;
    }

    // Update the WorkExperience with the given fields
    const updatedWorkExperience = await prisma.workExperience.update({
      where: { id: workExperienceId },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Work experience updated successfully", workExperience: updatedWorkExperience },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating work experience:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Work experience not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
