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
}

export const columns = (
  onDelete: (id: string) => void
): ColumnDef<Supplier>[] => [
  {
    id: "select",
    header: ({ table }: { table: TableType<Supplier> }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<Supplier> }) => (
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
    accessorKey: "companyName",
    header: ({ column }: { column: Column<Supplier> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Company
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "contactName",
    header: ({ column }: { column: Column<Supplier> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Contact Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: Column<Supplier> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }: { column: Column<Supplier> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Phone
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Supplier> }) => {
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
