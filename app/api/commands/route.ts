/*
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createCommandSchema } from "@/lib/validations/command";
import { ZodError } from "zod";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received data:", body);
    // Validation avec Zod
    const validatedData = createCommandSchema.parse(body);

    const command = await prisma.command.create({
      data: {
        ...validatedData,
      },
    });

    return NextResponse.json(command);
  } catch (error) {
    console.error("Error creating command:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error creating command", details: error },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const commands = await prisma.command.findMany({
      orderBy: {
        supplier: "asc", // Tri optionnel par nom d'entreprise
      },
    });

    if (!commands) {
      return NextResponse.json([]); // Retourne un tableau vide si pas de fournisseurs
    }

    return NextResponse.json(commands);
  } catch (error) {
    console.error("Error fetching commands:", error); // Log l'erreur pour le debugging
    return NextResponse.json(
      {
        error: "Error fetching suppliers",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const singleId = searchParams.get("id");

    if (singleId) {
      // Vérifier d'abord si le fournisseur existe
      const command = await prisma.command.findUnique({
        where: { id: singleId },
      });

      if (!command) {
        return NextResponse.json(
          { error: "Supplier not found" },
          { status: 404 }
        );
      }

      const deletedCommand = await prisma.command.delete({
        where: { id: singleId },
      });
      return NextResponse.json(deletedCommand);
    }

    // Amélioration de la gestion de la suppression multiple
    const body = await request.json();
    console.log("DELETE request body:", body); // Ajout d'un log pour déboguer

    if (!body || !body.ids) {
      return NextResponse.json(
        { error: "Invalid request body - ids array required" },
        { status: 400 }
      );
    }

    const commandIds = body.ids;
    console.log("Command IDs to delete:", commandIds); // Ajout d'un log pour déboguer

    const deletedCommands = await prisma.command.deleteMany({
      where: { id: { in: commandIds } },
    });

    console.log("Deleted commands result:", deletedCommands); // Ajout d'un log pour déboguer
    return NextResponse.json(deletedCommands);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "Command not found" }, { status: 404 });
    }

    console.error("Error deleting command(s):", error);
    return NextResponse.json(
      { error: "Error deleting command(s)", details: error },
      { status: 500 }
    );
  }
}
*/
