import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const formulas = await prisma.formula.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    const formattedFormulas = formulas.map((formula) => ({
      ...formula,
      ingredients: formula.ingredients.map((fi) => ({
        id: fi.ingredientId,
        name: fi.ingredient.name,
        quantity: fi.quantity,
        percentage: fi.percentage,
      })),
    }));

    return NextResponse.json(formattedFormulas);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch formulas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.ingredients || !Array.isArray(body.ingredients)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const formula = await prisma.formula.create({
      data: {
        name: body.name,
        superfat: Number(body.superfat) || 0,
        fabricationLosses: Number(body.fabricationLosses) || 0,
        cureLosses: Number(body.cureLosses) || 0,
        packagingCost: Number(body.packagingCost) || 0,
        ingredients: {
          create: await Promise.all(
            body.ingredients.map(async (ing: any) => {
              // Find or create the ingredient
              const ingredient = await prisma.ingredient.upsert({
                where: { name: ing.name },
                update: {},
                create: { name: ing.name },
              });

              return {
                ingredient: {
                  connect: { id: ingredient.id },
                },
                quantity: Number(ing.quantity),
                percentage: Number(ing.percentage),
              };
            })
          ),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    const formattedFormula = {
      ...formula,
      ingredients: formula.ingredients.map((fi) => ({
        id: fi.ingredientId,
        name: fi.ingredient.name,
        quantity: fi.quantity,
        percentage: fi.percentage,
      })),
    };

    return NextResponse.json(formattedFormula, { status: 201 });
  } catch (error) {
    console.error("Error creating formula:", error);
    return NextResponse.json(
      { error: "Failed to create formula" },
      { status: 500 }
    );
  }
}
