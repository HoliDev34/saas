"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { IngredientCard } from "./ingredient-card";
import { FinalDetailsForm } from "./final-details-form";

interface SelectedIngredient {
  id: string;
  name: string;
  quantity: number;
  percentage: number;
}

export function FormuleCreationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formulaName, setFormulaName] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredient[]
  >([]);
  const [superfat, setSuperfat] = useState("");
  const [fabricationLosses, setFabricationLosses] = useState("");
  const [cureLosses, setCureLosses] = useState("");
  const [packagingCost, setPackagingCost] = useState("");

  // Exemple de matières premières (à remplacer par vos données réelles)
  const ingredients = [
    { id: "1", name: "Huile d'olive" },
    { id: "2", name: "Huile de coco" },
    { id: "3", name: "Soude caustique" },
  ];

  const handleAddIngredient = (ingredientId: string) => {
    const ingredient = ingredients.find((i) => i.id === ingredientId);
    if (ingredient && !selectedIngredients.find((i) => i.id === ingredientId)) {
      setSelectedIngredients([
        ...selectedIngredients,
        { ...ingredient, quantity: 0, percentage: 0 },
      ]);
    }
  };

  const handleDeleteIngredient = (ingredientId: string) => {
    setSelectedIngredients(
      selectedIngredients.filter((i) => i.id !== ingredientId)
    );
  };

  const handleUpdateIngredient = (updatedIngredient: SelectedIngredient) => {
    setSelectedIngredients(
      selectedIngredients.map((i) =>
        i.id === updatedIngredient.id ? updatedIngredient : i
      )
    );
  };

  const handleSubmit = () => {
    console.log({
      formulaName,
      selectedIngredients,
      superfat,
      fabricationLosses,
      cureLosses,
      packagingCost,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="formulaName">Formula</Label>
            <Input
              id="formulaName"
              value={formulaName}
              onChange={(e) => setFormulaName(e.target.value)}
              placeholder="Enter formula name"
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.push("/formulas")}>
              Cancel
            </Button>
            <Button onClick={() => setStep(2)} disabled={!formulaName}>
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <Label>Select ingredients</Label>
            <Select onValueChange={handleAddIngredient}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an ingredient" />
              </SelectTrigger>
              <SelectContent>
                {ingredients.map((ingredient) => (
                  <SelectItem key={ingredient.id} value={ingredient.id}>
                    {ingredient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Ingredients selected</h3>
            {selectedIngredients.map((ingredient) => (
              <IngredientCard
                key={ingredient.id}
                ingredient={ingredient}
                onUpdate={handleUpdateIngredient}
                onDelete={handleDeleteIngredient}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={selectedIngredients.length === 0}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <FinalDetailsForm
          superfat={superfat}
          fabricationLosses={fabricationLosses}
          cureLosses={cureLosses}
          packagingCost={packagingCost}
          onSuperfatChange={setSuperfat}
          onFabricationLossesChange={setFabricationLosses}
          onCureLossesChange={setCureLosses}
          onPackagingCostChange={setPackagingCost}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
