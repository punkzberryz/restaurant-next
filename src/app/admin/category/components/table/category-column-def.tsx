"use client";

import { TableColumnHeader } from "@/components/table/table-column-header";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";

export const categoryColumnDef: ColumnDef<Category>[] = [
  {
    header: ({ column }) => (
      <>
        <TableColumnHeader title="ลำดับ" column={column} />
      </>
    ),
    accessorKey: "id",
    cell: ({ row }) => (
      <Link href={`/admin/category/${row.original.id}`}>{row.original.id}</Link>
    ),
    size: 40,
  },
  {
    header: "ชื่อหมวดหมู่",
    accessorKey: "name",
    cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    header: "แก้ไข",
    accessorKey: "edit",
    cell: ({ row }) => <EditButton categoryId={row.original.id} />,
    size: 40,
  },
  {
    header: "ลบ",
    accessorKey: "delete",
    cell: ({ row }) => <DeleteButton category={row.original} />,
    size: 40,
  },
];

const EditButton = ({ categoryId }: { categoryId: number }) => {
  return (
    <Button className="-my-2 h-8 rounded-md px-2" asChild variant="edit">
      <Link href={`/admin/category/${categoryId}`}>
        <Pencil className="h-3 w-3" />
      </Link>
    </Button>
  );
};
