/* "use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Command } from "@/types";
interface AddCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (supplier: Omit<Command, "id">) => void;
}

export function AddCommandModal({
  isOpen,
  onClose,
  onAdd,
}: AddCommandModalProps) {
  const [formData, setFormData] = useState({
    supplier: "",
    rawMaterials: "",
    date: "",
    amount: "",
    status: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.supplier ||
      !formData.rawMaterials ||
      !formData.date ||
      !formData.amount ||
      !formData.status
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await onAdd(formData);
      setFormData({
        supplier: "",
        rawMaterials: "",
        date: "",
        amount: "",
        status: "",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error adding supplier");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Command</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) =>
                setFormData({ ...formData, supplier: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rawMaterials">Raw Materials</Label>
            <Input
              id="rawMaterials"
              value={formData.rawMaterials}
              onChange={(e) =>
                setFormData({ ...formData, rawMaterials: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Amount</Label>
            <Input
              id="amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Status</Label>
            <Input
              id="Status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Command</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

*/
