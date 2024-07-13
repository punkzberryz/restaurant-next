"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import * as t from "@/components/ui/table";
interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showSearchBar?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showSearchBar = false,
}: Props<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    setSorting([]);
  }, []);

  return (
    <div className="space-y-4">
      {/* <TableToolbar table={table} showSearchBar={showSearchBar} /> */}
      <div className="rounded-md border">
        <t.Table>
          <t.TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <t.TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <t.TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </t.TableHead>
                  );
                })}
              </t.TableRow>
            ))}
          </t.TableHeader>
          <t.TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <t.TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <t.TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </t.TableCell>
                  ))}
                </t.TableRow>
              ))
            ) : (
              <t.TableRow>
                <t.TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </t.TableCell>
              </t.TableRow>
            )}
          </t.TableBody>
        </t.Table>
      </div>
    </div>
  );
}
