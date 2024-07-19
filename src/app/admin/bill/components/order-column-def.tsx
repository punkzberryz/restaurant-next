"use client";

import { TableColumnHeader } from "@/components/table/table-column-header";
import { formatDateToThaiDate } from "@/lib/format-date";
import { Order } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { orderStatusLabels } from "../../order/components/order-schema";
import { formatPrice } from "@/lib/format-price";
import { FileSymlink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const orderColumnDef: ColumnDef<Order>[] = [
  {
    header: ({ column }) => <TableColumnHeader title="รหัส" column={column} />,
    accessorKey: "id",
    cell: ({ row }) => (
      <Link href={`/admin/bill/${row.original.id}`}>
        <p className="w-[50px] overflow-clip truncate md:w-[100px] lg:w-full">
          {row.original.id}
        </p>
      </Link>
    ),
    size: 50,
  },
  {
    header: "จำนวนรายการ",
    accessorKey: "foodQuantity",
  },
  {
    header: "วันที่ทำซื้อ",
    accessorKey: "date",
    cell: ({ row }) =>
      formatDateToThaiDate(row.original.date.toDateString(), {
        shortDate: true,
      }),
  },
  {
    header: "สถานะ",
    accessorKey: "status",
    cell: ({ row }) => orderStatusLabels.get(row.original.status),
  },
  {
    header: "ราคารวม (บาท)",
    accessorKey: "totalPrice",
    cell: ({ row }) => formatPrice(row.original.totalPrice),
  },
  {
    header: "รายละเอียด",
    accessorKey: "detail",
    cell: ({ row }) => (
      <Button asChild size="sm" className="-my-2 h-8 rounded-md px-2">
        <Link href={`/admin/bill/${row.original.id}`}>
          <FileSymlink className="h-4 w-4" />
        </Link>
      </Button>
    ),
  },
];
