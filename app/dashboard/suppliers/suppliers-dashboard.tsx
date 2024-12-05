"use client";

import { columns } from "@/components/layout/suppliers/table-columns";
import { DataTable } from "@/components/layout/table-data";
import { ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { AddSupplierModal } from "@/components/modals/supplier/add-supplier-modal";
import { Row, Table as TableType, ColumnDef } from "@tanstack/react-table";
import { mutate } from "swr";

interface Supplier {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  commands: Command[];
  lastCommandDate: Date | null;
}

interface Command {
  id: string;
  date: Date;
  amount: number;
  status: string;
  description: string;
}

export function SuppliersDashboard() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [data, setData] = useState<Supplier[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/api/suppliers");
        if (!response.ok) throw new Error("Failed to fetch suppliers");
        const suppliers = await response.json();
        setData(suppliers);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleDelete = async (id: string) => {
    console.log("Attempting to delete supplier with ID:", id);

    try {
      const response = await fetch(`/api/suppliers?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      const responseText = await response.text();
      console.log("Response body:", responseText);

      if (!response.ok) {
        throw new Error(
          `Failed to delete supplier: ${response.status} ${responseText}`
        );
      }

      setData(data.filter((supplier) => supplier.id !== id));
      mutate("/api/suppliers");
    } catch (error) {
      console.error("Error deleting supplier:", error);
      alert(
        `Failed to delete supplier: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleAddSupplier = async (
    newSupplier: Omit<Supplier, "id" | "commands" | "lastCommandDate">
  ) => {
    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSupplier),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.details || responseData.error || "Failed to add supplier"
        );
      }

      setData((prevData) => [...prevData, responseData]);
    } catch (error) {
      console.error("Error adding supplier:", error);
      alert(error instanceof Error ? error.message : "Failed to add supplier");
      throw error;
    }
  };

  const handleDeleteSelected = async (table: TableType<Supplier>) => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row: Row<Supplier>) => row.original.id);

    if (selectedIds.length === 0) {
      alert("No suppliers selected");
      return;
    }

    try {
      const response = await fetch("/api/suppliers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete suppliers");
      }

      setData(data.filter((supplier) => !selectedIds.includes(supplier.id)));
      table.toggleAllRowsSelected(false);
      mutate("/api/suppliers");
    } catch (error) {
      console.error("Error deleting suppliers:", error);
      alert("Failed to delete suppliers");
    }
  };

  const renderRow = (supplier: Supplier) => (
    <tr key={supplier.id}>
      <td>{supplier.companyName}</td>
      <td>{supplier.contactName}</td>
      <td>
        <button onClick={() => handleDelete(supplier.id)}>Supprimer</button>
      </td>
    </tr>
  );

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <ClipboardList className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">
            Manage relationships and orders of your suppliers.
          </p>
        </div>
      </div>
      <DataTable
        columns={columns(handleDelete) as ColumnDef<Supplier, unknown>[]}
        data={data}
        onAddNew={() => setIsAddModalOpen(true)}
        onDeleteSelected={handleDeleteSelected}
      />
      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSupplier}
      />
    </div>
  );
}
