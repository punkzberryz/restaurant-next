"use client";
import { TableColumnHeader } from "@/components/table/table-column-header";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const userColumnDef: ColumnDef<User>[] = [
  {
    header: ({ column }) => <TableColumnHeader title="ลำดับ" column={column} />,
    accessorKey: "id",
    cell: ({ row }) => (
      <Link href={`/admin/staff/${row.original.id}`}>{row.index + 1}</Link>
    ),
  },
  {
    header: ({ column }) => (
      <TableColumnHeader title="ชื่อแสดง (Display Name)" column={column} />
    ),
    accessorKey: "displayName",
    cell: ({ row }) => <div>{row.original.displayName}</div>,
  },
  {
    header: ({ column }) => (
      <TableColumnHeader title="ตำแหน่ง" column={column} />
    ),
    accessorKey: "role",
    cell: ({ row }) => <div>{row.original.role}</div>,
  },
];
