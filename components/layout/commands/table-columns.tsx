"use client";

import {
  ColumnDef,
  Table as TableType,
  Row,
  Column,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowUpDown, ClipboardList, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, FileText, Trash } from "lucide-react";

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
  rawMaterials: RawMaterial[];
  date: Date;
  amount: number;
  status: string;
}

interface RawMaterial {
  id: string;
  name: string;
}

export const columns = (
  onDelete: (id: string) => void
): ColumnDef<Command>[] => [
  {
    id: "select",
    header: ({ table }: { table: TableType<Command> }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<Command> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "supplier",
    header: ({ column }: { column: Column<Command> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Supplier
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "rawMaterials",
    header: ({ column }: { column: Column<Command> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Raw Materials
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }: { column: Column<Command> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }: { column: Column<Command> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }: { column: Column<Command> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Command> }) => {
      const supplier = row.original;
      return (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:text-red-600"
          onClick={async () => {
            try {
              await onDelete(supplier.id);
            } catch (error) {
              console.error("Error deleting supplier:", error);
            }
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      );
    },
  },
];
