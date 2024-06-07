'use client'
import React from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react'
import { useDataContext } from './context/useDataContext'
import { columns } from './columns'

export function MainTable() {
    const { data, isLoading, isError } = useDataContext()

    const table = useReactTable({
        data: data?.length ? data : [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (isLoading) {
        return <>Loading...</>
    }

    if (isError) {
        return <>Error trying to fetch data</>
    }

    return (
        <Table aria-label="users-tabel">
            <TableHeader>
                {table.getFlatHeaders().map((header) => (
                    <TableColumn key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
