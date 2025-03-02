"use client";

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseAsInteger, useQueryState } from "nuqs";
import { type ReactNode, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  usersCount: number;
  userId?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  usersCount,
  userId,
}: DataTableProps<TData, TValue>) {
  const [pageIndex, setPageIndex] = useQueryState("pageIndex", parseAsInteger);
  const [pageSize, setPageSize] = useQueryState("pageSize", parseAsInteger);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater !== "function") return;

      const newPageInfo = updater(table.getState().pagination);

      setPageIndex(newPageInfo.pageIndex);
      setPageSize(newPageInfo.pageSize);
    },
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination: {
        pageIndex: pageIndex || 0,
        pageSize: pageSize || 10,
      },
    },
    meta: {
      usersCount,
      userId,
    },
    autoResetPageIndex: false,
  });

  return (
    <div>
      <div className="rounded-md border bg-black">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : (flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          ) as ReactNode)}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        ) as ReactNode
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
