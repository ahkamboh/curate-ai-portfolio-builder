import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the user
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const skillId = params.id;

    // Delete the Skill linked to the specific resume
    const deletedSkill = await prisma.skill.delete({
      where: { id: skillId },
    });

    return NextResponse.json(
      { message: "Skill deleted successfully", skill: deletedSkill },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting skill:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
