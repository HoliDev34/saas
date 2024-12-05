import { NextResponse } from "next/server";

// Types
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  percentage: number;
}

export interface Formula {
  id: string;
  name: string;
  ingredients: Ingredient[];
  superfat: number;
  fabricationLosses: number;
  cureLosses: number;
  packagingCost: number;
  createdAt: string;
  updatedAt: string;
}

// In-memory storage (replace with your database)
let formulas: Formula[] = [];

// GET /api/formulas
export async function GET() {
  try {
    return NextResponse.json(formulas);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch formulas" },
      { status: 500 }
    );
  }
}

// POST /api/formulas
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.ingredients || !Array.isArray(body.ingredients)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new formula
    const newFormula: Formula = {
      id: crypto.randomUUID(),
      name: body.name,
      ingredients: body.ingredients,
      superfat: Number(body.superfat) || 0,
      fabricationLosses: Number(body.fabricationLosses) || 0,
      cureLosses: Number(body.cureLosses) || 0,
      packagingCost: Number(body.packagingCost) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    formulas.push(newFormula);
    return NextResponse.json(newFormula, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create formula" },
      { status: 500 }
    );
  }
}
