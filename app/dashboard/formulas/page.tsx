import { FormulasList } from "@/components/layout/formulas/formulas-list";
import { CreateFormulaButton } from "@/components/layout/formulas/create-formula-button";
import { FlaskConical } from "lucide-react";

export default function FormulesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between gap-4 mb-8">
        <div className="flex items-center gap-4 mb-8">
          <FlaskConical className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Formulas</h1>
            <p className="text-muted-foreground">
              Here you can find all your formulas.
            </p>
          </div>
        </div>
        <CreateFormulaButton />
      </div>
      <FormulasList />
    </div>
  );
}
