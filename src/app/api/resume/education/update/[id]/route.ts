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

    const educationId = params.id;
    const body = await req.json();

    // Build the data object to update, including only fields that are present in the request body
    const dataToUpdate: { [key: string]: any } = {};
    if (body.institution !== undefined) dataToUpdate.institution = body.institution;
    if (body.degree !== undefined) dataToUpdate.degree = body.degree;
    if (body.startDate !== undefined) dataToUpdate.startDate = new Date(body.startDate);
    if (body.endDate !== undefined) dataToUpdate.endDate = body.endDate ? new Date(body.endDate) : null;

    // Update the Education entry linked to the specific resume
    const updatedEducation = await prisma.education.update({
      where: { id: educationId },
      data: dataToUpdate,
    });

    return NextResponse.json(
      { message: "Education entry updated successfully", education: updatedEducation },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating education entry:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Education entry not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
