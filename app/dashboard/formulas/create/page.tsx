"use client";

import { FormulasCreationForm } from "@/components/layout/formulas/formulas-creation-form";
import { FlaskConical } from "lucide-react";

export default function FormulesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <FlaskConical className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Formulas</h1>
          <p className="text-muted-foreground">Create a new formula</p>
        </div>
      </div>
      <FormulasCreationForm />
    </div>
  );
}
