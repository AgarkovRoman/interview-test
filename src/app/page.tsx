'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReviewProvider } from './context/ReviewContext'
import { MainTable } from './MainTable'

const SIX_MINUTES = 360 * 1000

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            gcTime: SIX_MINUTES,
        },
    },
})

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <ReviewProvider>
                    <MainTable />
                </ReviewProvider>
            </NextUIProvider>
        </QueryClientProvider>
    )
}
