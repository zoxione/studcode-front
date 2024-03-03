"use client"

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { columns } from "./columns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/01-shared/ui/Table"
import { useGetOneByIdTeamQuery } from "@/02-entities/team"

interface MembersTableProps<TData, TValue> {
  // columns: ColumnDef<TData, TValue>[]
  // data: TData[]
  teamName: string
}

const MembersTable = <TData, TValue>({ teamName }: MembersTableProps<TData, TValue>) => {
  const { data: team } = useGetOneByIdTeamQuery(teamName)

  const table = useReactTable({
    data: team?.members || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="[&:has([role=option])]:w-[0%] [&:has([role=option])]:sticky [&:has([role=option])]:right-0 [&:has([role=option])]:bg-background"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="[&:has([role=option])]:w-[0%] [&:has([role=option])]:sticky [&:has([role=option])]:right-0 [&:has([role=option])]:bg-background"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Нет данных.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export { MembersTable }
