'use client'
import React from 'react'
import { CellContext, createColumnHelper } from '@tanstack/react-table'
import { BasicForReview, UserWithDataForReview } from './shared/types'
import { CustomCell } from './shared/CustomCell'

const columnHelper = createColumnHelper<UserWithDataForReview>()

const renderCustomCell = (ctx: CellContext<UserWithDataForReview, BasicForReview>) => (
    <CustomCell id={ctx.row.original.id} fieldName={ctx.column.id} value={ctx.getValue()} />
)

export const columns = [
    columnHelper.accessor('id', {
        header: 'User ID',
    }),
    columnHelper.accessor('name', {
        header: 'Name',
        cell: renderCustomCell,
    }),
    columnHelper.accessor('username', {
        header: 'Username',
        cell: renderCustomCell,
    }),
    columnHelper.accessor('phone', {
        header: 'Phone',
        cell: renderCustomCell,
    }),
    columnHelper.accessor('website', {
        header: 'Website',
        cell: renderCustomCell,
    }),
]
