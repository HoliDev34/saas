import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createSupplierSchema } from "@/lib/validations/supplier";
import { ZodError } from "zod";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received data:", body);
    // Validation avec Zod
    const validatedData = createSupplierSchema.parse(body);

    const supplier = await prisma.supplier.create({
      data: {
        ...validatedData,
        commands: {
          create: [],
        },
        lastCommandDate: null,
      },
    });

    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error creating supplier:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error creating supplier", details: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        commands: true,
      },
      orderBy: {
        companyName: "asc", // Tri optionnel par nom d'entreprise
      },
    });

    if (!suppliers) {
      return NextResponse.json([]); // Retourne un tableau vide si pas de fournisseurs
    }

    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error); // Log l'erreur pour le debugging
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
      const supplier = await prisma.supplier.findUnique({
        where: { id: singleId },
      });

      if (!supplier) {
        return NextResponse.json(
          { error: "Supplier not found" },
          { status: 404 }
        );
      }

      const deletedSupplier = await prisma.supplier.delete({
        where: { id: singleId },
      });
      return NextResponse.json(deletedSupplier);
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

    const supplierIds = body.ids;
    console.log("Supplier IDs to delete:", supplierIds); // Ajout d'un log pour déboguer

    const deletedSuppliers = await prisma.supplier.deleteMany({
      where: { id: { in: supplierIds } },
    });

    console.log("Deleted suppliers result:", deletedSuppliers); // Ajout d'un log pour déboguer
    return NextResponse.json(deletedSuppliers);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "P2025") {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }

    console.error("Error deleting supplier(s):", error);
    return NextResponse.json(
      { error: "Error deleting supplier(s)", details: error },
      { status: 500 }
    );
  }
}
