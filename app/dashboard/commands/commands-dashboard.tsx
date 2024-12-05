/* "use client";

import { columns } from "@/components/layout/suppliers-layout/table-columns";
import { DataTable } from "@/components/layout/table-data";
import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AddCommandModal } from "@/components/modals/add-command-modal";
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
  supplier: Supplier;
  rawMaterials: RawMaterials[];
  date: Date;
  amount: number;
  status: string;
}

interface RawMaterials {
  id: string;
  name: string;
}

export function CommandsDashboard() {
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [data, setData] = useState<Command[]>([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch("/api/commands");
        if (!response.ok) throw new Error("Failed to fetch commands");
        const commands = await response.json();
        setData(commands);
      } catch (error) {
        console.error("Error fetching commands:", error);
      }
    };
    fetchCommands();
  }, []);

  const handleDelete = async (id: string) => {
    console.log("Attempting to delete command with ID:", id);

    try {
      const response = await fetch(`/api/commands?id=${id}`, {
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
          `Failed to delete command: ${response.status} ${responseText}`
        );
      }

      setData(data.filter((command) => command.id !== id));
      mutate("/api/commands");
    } catch (error) {
      console.error("Error deleting command:", error);
      alert(
        `Failed to delete command: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleAddCommand = async (newCommand: Omit<Command, "id">) => {
    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCommand),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.details || responseData.error || "Failed to add command"
        );
      }

      setData((prevData) => [...prevData, responseData]);
    } catch (error) {
      console.error("Error adding command:", error);
      alert(error instanceof Error ? error.message : "Failed to add command");
      throw error;
    }
  };

  const handleDeleteSelected = async (table: TableType<Command>) => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row: Row<Command>) => row.original.id);

    if (selectedIds.length === 0) {
      alert("No commands selected");
      return;
    }

    try {
      const response = await fetch("/api/commands", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete commands");
      }

      setData(data.filter((command) => !selectedIds.includes(command.id)));
      table.toggleAllRowsSelected(false);
      mutate("/api/commands");
    } catch (error) {
      console.error("Error deleting commands:", error);
      alert("Failed to delete commands");
    }
  };

  const renderRow = (command: Command) => (
    <tr key={command.id}>
      <td>
        <button onClick={() => handleDelete(command.id)}>Delete</button>
      </td>
    </tr>
  );

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <Building2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commands</h1>
          <p className="text-muted-foreground">Manage your suppliers orders.</p>
        </div>
      </div>
      <DataTable
        columns={columns(handleDelete) as ColumnDef<Command, unknown>[]}
        data={data}
        onAddNew={() => setIsAddModalOpen(true)}
        onDeleteSelected={handleDeleteSelected}
      />
      <AddCommandModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCommand}
      />
    </div>
  );
}

*/
