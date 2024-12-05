/* "use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, Trash2, ArrowUpDown, Eye } from "lucide-react";
import { deleteFormula } from "@/lib/api/formula";
import { IngredientsModal } from "../../modals/formula/ingredients-modal";
import { EditFormulaModal } from "../../modals/formula/edit-formula-modal";
import type { Formula } from "@/app/api/formulas/[id]/page";

type SortDirection = "asc" | "desc" | null;
type SortField =
  | "name"
  | "ingredients"
  | "superfat"
  | "fabricationLosses"
  | "cureLosses"
  | "packagingCost";

export function FormulasList() {
  const [selectedFormulas, setSelectedFormulas] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [viewIngredientsModal, setViewIngredientsModal] = useState<{
    isOpen: boolean;
    formula: Formula | null;
  }>({
    isOpen: false,
    formula: null,
  });
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    formula: Formula | null;
  }>({
    isOpen: false,
    formula: null,
  });

  // Exemple de données (à remplacer par vos données réelles)
  const [formulas, setFormulas] = useState<Formula[]>([
    {
      id: "1",
      name: "Formule Lavande",
      ingredients: [
        { id: "1", name: "Huile d'olive", quantity: 500, percentage: 50 },
        { id: "2", name: "Huile de coco", quantity: 300, percentage: 30 },
      ],
      superfat: 8,
      fabricationLosses: 2,
      cureLosses: 3,
      packagingCost: 12.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortedFormulas = () => {
    if (!sortField || !sortDirection) return formulas;

    return [...formulas].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedFormulas.length === formulas.length) {
      setSelectedFormulas([]);
    } else {
      setSelectedFormulas(formulas.map((f) => f.id));
    }
  };

  const handleSelectFormula = (id: string) => {
    if (selectedFormulas.includes(id)) {
      setSelectedFormulas(selectedFormulas.filter((fId) => fId !== id));
    } else {
      setSelectedFormulas([...selectedFormulas, id]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedFormulas.map((id) => deleteFormula(id)));
      setFormulas(formulas.filter((f) => !selectedFormulas.includes(f.id)));
      setSelectedFormulas([]);
    } catch (error) {
      console.error("An error appeared on formulas deletion:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFormula(id);
      setFormulas(formulas.filter((f) => f.id !== id));
    } catch (error) {
      console.error("An error appeared on formula deletion:", error);
    }
  };

  const handleEdit = (formula: Formula) => {
    setEditModal({ isOpen: true, formula });
  };

  const handleUpdate = (updatedFormula: Formula) => {
    setFormulas(
      formulas.map((f) => (f.id === updatedFormula.id ? updatedFormula : f))
    );
  };

  const SortButton = ({ field }: { field: SortField }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2"
      onClick={() => handleSort(field)}
    >
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="space-y-4">
      {selectedFormulas.length > 0 && (
        <div className="flex justify-end">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteSelected}
            className="mb-4"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete ({selectedFormulas.length})
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedFormulas.length === formulas.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                Name
                <SortButton field="name" />
              </TableHead>
              <TableHead>
                Ingredients
                <SortButton field="ingredients" />
              </TableHead>
              <TableHead>Ingredients</TableHead>
              <TableHead>
                Superfat (%)
                <SortButton field="superfat" />
              </TableHead>
              <TableHead>
                Fabrication Losses(%)
                <SortButton field="fabricationLosses" />
              </TableHead>
              <TableHead>
                Cure Losses(%)
                <SortButton field="cureLosses" />
              </TableHead>
              <TableHead>
                Packaging Cost (€)
                <SortButton field="packagingCost" />
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getSortedFormulas().map((formula) => (
              <TableRow key={formula.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedFormulas.includes(formula.id)}
                    onCheckedChange={() => handleSelectFormula(formula.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{formula.name}</TableCell>
                <TableCell>{formula.ingredients.length}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setViewIngredientsModal({
                        isOpen: true,
                        formula: formula,
                      })
                    }
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>{formula.superfat}%</TableCell>
                <TableCell>{formula.fabricationLosses}%</TableCell>
                <TableCell>{formula.cureLosses}%</TableCell>
                <TableCell>{formula.packagingCost}€</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(formula)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(formula.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {viewIngredientsModal.formula && (
        <IngredientsModal
          isOpen={viewIngredientsModal.isOpen}
          onClose={() =>
            setViewIngredientsModal({ isOpen: false, formula: null })
          }
          ingredients={viewIngredientsModal.formula.ingredients}
        />
      )}

      {editModal.formula && (
        <EditFormulaModal
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, formula: null })}
          formula={editModal.formula}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

*/
