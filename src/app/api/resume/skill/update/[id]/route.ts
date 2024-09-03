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

    const skillId = params.id;
    const body = await req.json();

    // Build the data object to update, including only fields that are present in the request body
    const dataToUpdate: { [key: string]: any } = {};
    if (body.name !== undefined) dataToUpdate.name = body.name;

    // Update the Skill entry linked to the specific resume
    const updatedSkill = await prisma.skill.update({
      where: { id: skillId },
      data: dataToUpdate,
    });

    return NextResponse.json(
      { message: "Skill updated successfully", skill: updatedSkill },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating skill:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
