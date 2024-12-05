"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface SelectedIngredient {
  id: string;
  name: string;
  quantity: number;
  percentage: number;
}

interface IngredientCardProps {
  ingredient: SelectedIngredient;
  onUpdate: (ingredient: SelectedIngredient) => void;
  onDelete: (id: string) => void;
}

export function IngredientCard({
  ingredient,
  onUpdate,
  onDelete,
}: IngredientCardProps) {
  const handleNumberInput = (
    value: string,
    field: "quantity" | "percentage"
  ) => {
    const parsedValue = parseInt(value, 10);
    onUpdate({
      ...ingredient,
      [field]: isNaN(parsedValue) ? 0 : parsedValue,
    });
  };

  return (
    <Card className="p-4">
      <div className="grid grid-cols-[1fr,1fr,1fr,auto] gap-4 items-end">
        <div>
          <Label>Name</Label>
          <p>{ingredient.name}</p>
        </div>
        <div>
          <Label htmlFor={`quantity-${ingredient.id}`}>Quantity (g)</Label>
          <Input
            id={`quantity-${ingredient.id}`}
            type="number"
            min="0"
            value={ingredient.quantity || ""}
            onChange={(e) => handleNumberInput(e.target.value, "quantity")}
          />
        </div>
        <div>
          <Label htmlFor={`percentage-${ingredient.id}`}>Percentage (%)</Label>
          <Input
            id={`percentage-${ingredient.id}`}
            type="number"
            min="0"
            value={ingredient.percentage || ""}
            onChange={(e) => handleNumberInput(e.target.value, "percentage")}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(ingredient.id)}
          className="text-destructive hover:text-destructive/90"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
