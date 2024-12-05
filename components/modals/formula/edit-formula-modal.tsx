/* "use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Formula } from "@/app/api/formulas/[id]/page";
import { updateFormula } from "@/lib/api/formula";
import { IngredientManagement } from "../../layout/formulas/ingredient-management";

interface EditFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  formula: Formula;
  onUpdate: (updatedFormula: Formula) => void;
}

export function EditFormulaModal({
  isOpen,
  onClose,
  formula,
  onUpdate,
}: EditFormulaModalProps) {
  const [formData, setFormData] = useState<Formula>(formula);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form data when formula changes
  useEffect(() => {
    setFormData(formula);
  }, [formula]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedFormula = await updateFormula(formula.id, formData);
      onUpdate(updatedFormula);
      toast.success("Formule mise à jour avec succès");
      onClose();
    } catch (error) {
      console.error("Error updating formula:", error);
      toast.error("Erreur lors de la mise à jour de la formule");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof Formula, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "name" ? value : Number(value),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit formula</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Ingredients</Label>
            <IngredientManagement
              ingredients={formData.ingredients}
              onChange={(ingredients) =>
                setFormData({ ...formData, ingredients })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="superfat">Superfat (%)</Label>
              <Input
                id="superfat"
                type="number"
                min="0"
                step="0.1"
                value={formData.superfat}
                onChange={(e) => handleChange("superfat", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fabricationLosses">Pertes Fabrication (%)</Label>
              <Input
                id="fabricationLosses"
                type="number"
                min="0"
                step="0.1"
                value={formData.fabricationLosses}
                onChange={(e) =>
                  handleChange("fabricationLosses", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="cureLosses">Cure Losses(%)</Label>
              <Input
                id="cureLosses"
                type="number"
                min="0"
                step="0.1"
                value={formData.cureLosses}
                onChange={(e) => handleChange("cureLosses", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="packagingCost">Packaging Cost (€)</Label>
              <Input
                id="packagingCost"
                type="number"
                min="0"
                step="0.01"
                value={formData.packagingCost}
                onChange={(e) => handleChange("packagingCost", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

*/
