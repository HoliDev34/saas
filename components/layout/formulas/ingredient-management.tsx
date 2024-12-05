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
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import type { Ingredient } from "@/app/api/formulas/[id]/page";

interface IngredientManagementProps {
  ingredients: Ingredient[];
  onChange: (ingredients: Ingredient[]) => void;
}

export function IngredientManagement({
  ingredients,
  onChange,
}: IngredientManagementProps) {
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>("");

  // Example ingredients list (replace with your actual data)
  const availableIngredients = [
    { id: "1", name: "Huile d'olive" },
    { id: "2", name: "Huile de coco" },
    { id: "3", name: "Soude caustique" },
  ];

  const handleAddIngredient = () => {
    if (!selectedIngredientId) return;

    const ingredient = availableIngredients.find(
      (i) => i.id === selectedIngredientId
    );
    if (ingredient && !ingredients.find((i) => i.id === selectedIngredientId)) {
      onChange([...ingredients, { ...ingredient, quantity: 0, percentage: 0 }]);
      setSelectedIngredientId(""); // Reset selection after adding
    }
  };

  const handleUpdateIngredient = (
    index: number,
    field: "quantity" | "percentage",
    value: string
  ) => {
    const newIngredients = [...ingredients];
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: parsedValue,
      };
      onChange(newIngredients);
    }
  };

  const handleDeleteIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    onChange(newIngredients);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label>Add an ingredient</Label>
          <Select
            value={selectedIngredientId}
            onValueChange={setSelectedIngredientId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose an ingredient" />
            </SelectTrigger>
            <SelectContent>
              {availableIngredients.map((ingredient) => (
                <SelectItem key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleAddIngredient}
            disabled={!selectedIngredientId}
            className="mb-[2px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <Card key={ingredient.id} className="p-4">
            <div className="grid grid-cols-[1fr,1fr,1fr,auto] gap-4 items-end">
              <div>
                <Label>Name</Label>
                <p>{ingredient.name}</p>
              </div>
              <div>
                <Label htmlFor={`quantity-${ingredient.id}`}>
                  Quantity (g)
                </Label>
                <Input
                  id={`quantity-${ingredient.id}`}
                  type="number"
                  min="0"
                  value={ingredient.quantity || ""}
                  onChange={(e) =>
                    handleUpdateIngredient(index, "quantity", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor={`percentage-${ingredient.id}`}>
                  Percentage (%)
                </Label>
                <Input
                  id={`percentage-${ingredient.id}`}
                  type="number"
                  min="0"
                  value={ingredient.percentage || ""}
                  onChange={(e) =>
                    handleUpdateIngredient(index, "percentage", e.target.value)
                  }
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteIngredient(index)}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
