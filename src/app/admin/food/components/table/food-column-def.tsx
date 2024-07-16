"use client";
import { TableColumnHeader } from "@/components/table/table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { FoodWithImagesAndCategory, unitLabels } from "../food-schema";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { DeleteButton } from "./delete-button";

export const foodColumnDef: ColumnDef<FoodWithImagesAndCategory>[] = [
  {
    header: ({ column }) => <TableColumnHeader title="ลำดับ" column={column} />,
    accessorKey: "id",
    cell: ({ row }) => (
      <Link href={`/admin/food/${row.original.id}`}>{row.original.id}</Link>
    ),
    size: 40,
  },
  {
    header: "รูปภาพ",
    accessorKey: "images",
    cell: ({ row }) => {
      const image = row.original.images[0];
      if (!image) return null;
      return (
        <div className="w-fit overflow-clip rounded-lg">
          <Image
            alt={row.original.name}
            src={image.url}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      );
    },
  },
  {
    header: ({ column }) => (
      <TableColumnHeader title="หมวดหมู่" column={column} />
    ),
    accessorKey: "category.name",
  },
  {
    header: ({ column }) => (
      <TableColumnHeader title="ชื่ออาหาร" column={column} />
    ),
    accessorKey: "name",
  },
  {
    header: ({ column }) => <TableColumnHeader title="ราคา" column={column} />,
    accessorKey: "price",
  },
  {
    header: ({ column }) => <TableColumnHeader title="หน่วย" column={column} />,
    accessorKey: "unit",
    cell: ({ row }) => <p>{unitLabels.get(row.original.unit)}</p>,
  },
  {
    header: "แก้ไข",
    accessorKey: "edit",
    cell: ({ row }) => <EditButton foodId={row.original.id} />,
    size: 40,
  },
  {
    header: "ลบ",
    accessorKey: "delete",
    cell: ({ row }) => <DeleteButton food={row.original} />,
    size: 40,
  },
];

const EditButton = ({ foodId }: { foodId: number }) => {
  return (
    <Button className="-my-2 h-8 rounded-md px-2" asChild variant="edit">
      <Link href={`/admin/food/${foodId}`}>
        <Pencil className="h-3 w-3" />
      </Link>
    </Button>
  );
};
