"use client";
import { userRoleLabels } from "@/app/auth/components/user-schema";
import { TableColumnHeader } from "@/components/table/table-column-header";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";

export const userColumnDef: ColumnDef<User>[] = [
  {
    header: ({ column }) => <TableColumnHeader title="ลำดับ" column={column} />,
    accessorKey: "id",
    cell: ({ row }) => (
      <Link href={`/admin/staff/${row.original.id}`}>{row.index + 1}</Link>
    ),
    size: 40,
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
    cell: ({ row }) => <div>{userRoleLabels.get(row.original.role)}</div>,
    size: 40,
  },
  {
    header: "แก้ไขรหัส",
    accessorKey: "changePassword",
    size: 40,
    cell: ({ row }) => (
      <Button className="-my-2 h-8 rounded-md px-2" asChild variant="secondary">
        <Link href={`/admin/staff/${row.original.id}/change-password`}>
          <Pencil className="h-3 w-3" />
        </Link>
      </Button>
    ),
  },
  {
    header: "แก้ไขข้อมูล",
    size: 40,
    cell: ({ row }) => (
      <Button className="-my-2 h-8 rounded-md px-2" asChild variant="edit">
        <Link href={`/admin/staff/${row.original.id}`}>
          <Pencil className="h-3 w-3" />
        </Link>
      </Button>
    ),
  },
  {
    header: "ลบ",
    size: 40,
    cell: ({ row }) => <DeleteButton staff={row.original} />,
  },
];
