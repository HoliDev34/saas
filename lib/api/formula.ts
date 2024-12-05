import type { Formula } from "@/app/api/formulas/[id]/page";

// API client functions
export async function getFormulas(): Promise<Formula[]> {
  const response = await fetch("/api/formulas");
  if (!response.ok) throw new Error("Failed to fetch formulas");
  return response.json();
}

export async function getFormula(id: string): Promise<Formula> {
  const response = await fetch(`/api/formulas/${id}`);
  if (!response.ok) throw new Error("Failed to fetch formula");
  return response.json();
}

export async function createFormula(
  data: Omit<Formula, "id" | "createdAt" | "updatedAt">
) {
  const response = await fetch("/api/formulas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create formula");
  return response.json();
}

export async function updateFormula(id: string, data: Partial<Formula>) {
  const response = await fetch(`/api/formulas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      superfat: data.superfat,
      fabricationLosses: data.fabricationLosses,
      cureLosses: data.cureLosses,
      packagingCost: data.packagingCost,
      ingredients: data.ingredients?.map((ing) => ({
        name: ing.name,
        quantity: ing.quantity,
        percentage: ing.percentage,
      })),
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update formula");
  }
  return response.json();
}

export async function deleteFormula(id: string) {
  const response = await fetch(`/api/formulas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete formula");
  return response.json();
}

export async function getIngredients() {
  const response = await fetch("/api/ingredients");
  if (!response.ok) throw new Error("Failed to fetch ingredients");
  return response.json();
}
