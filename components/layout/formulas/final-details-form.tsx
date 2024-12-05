"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FinalDetailsFormProps {
  superfat: string;
  fabricationLosses: string;
  cureLosses: string;
  packagingCost: string;
  onSuperfatChange: (value: string) => void;
  onFabricationLossesChange: (value: string) => void;
  onCureLossesChange: (value: string) => void;
  onPackagingCostChange: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function FinalDetailsForm({
  superfat,
  fabricationLosses,
  cureLosses,
  packagingCost,
  onSuperfatChange,
  onFabricationLossesChange,
  onCureLossesChange,
  onPackagingCostChange,
  onBack,
  onSubmit,
}: FinalDetailsFormProps) {
  const handleNumberInput = (value: string) => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? "" : value;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="superfat">Superfat (%)</Label>
          <Input
            id="superfat"
            type="number"
            min="0"
            step="0.1"
            value={superfat}
            onChange={(e) =>
              onSuperfatChange(handleNumberInput(e.target.value))
            }
          />
        </div>
        <div>
          <Label htmlFor="pertesFabrication">Fabrication Losses (%)</Label>
          <Input
            id="fabricationLosses"
            type="number"
            min="0"
            step="0.1"
            value={fabricationLosses}
            onChange={(e) =>
              onFabricationLossesChange(handleNumberInput(e.target.value))
            }
          />
        </div>
        <div>
          <Label htmlFor="pertesCure">Cure Losses (%)</Label>
          <Input
            id="cureLosses"
            type="number"
            min="0"
            step="0.1"
            value={cureLosses}
            onChange={(e) =>
              onCureLossesChange(handleNumberInput(e.target.value))
            }
          />
        </div>
        <div>
          <Label htmlFor="coutAC">Packaging Cost (€)</Label>
          <Input
            id="packagingCost"
            type="number"
            min="0"
            step="0.01"
            value={packagingCost}
            onChange={(e) =>
              onPackagingCostChange(handleNumberInput(e.target.value))
            }
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit}>Create the formula</Button>
      </div>
    </div>
  );
}
