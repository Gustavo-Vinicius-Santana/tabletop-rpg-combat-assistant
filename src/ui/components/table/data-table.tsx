"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/components/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/shadcn/components/dropdown-menu";
import { Button } from "@/ui/shadcn/components/button";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { useTabelaPersonagemModal } from "@/lib/stores/useModal";
import type { Personagem } from "@/lib/types/type";

interface DataTableProps {
  columns: ColumnDef<Personagem>[];
  data: Personagem[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const { onOpen } = useTabelaPersonagemModal();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
  });

  function openModalTabela(personagem: Personagem) {
    onOpen(personagem);
  }

  return (
    <div className="space-y-4 max-w-[375px] md:max-w-full">
      {/* Dropdown para selecionar colunas visíveis */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.columnDef.header as string}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Container responsivo */}
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-[600px]"> 
          {/* 👆 garante largura mínima e força scroll no mobile */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();

                  return (
                    <TableHead
                      key={header.id}
                      onClick={
                        canSort
                          ? () => header.column.toggleSorting()
                          : undefined
                      }
                      className={canSort ? "cursor-pointer select-none" : ""}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {canSort && (
                          <ArrowUpDown
                            className={`w-4 h-4 transition-opacity ${
                              isSorted ? "opacity-100" : "opacity-30"
                            }`}
                          />
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onClick={() => {
                        if (cell.column.id === "nome") {
                          openModalTabela(row.original);
                        }
                      }}
                      className={
                        cell.column.id === "nome"
                          ? "cursor-pointer text-blue-600 hover:underline"
                          : ""
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Nenhum dado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}