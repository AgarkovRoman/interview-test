import React, { createContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CellBasicType, ContextType, MarkAsReviewParams } from './types'
import { mapData } from './utils/mapData'
import { findNextCellForReview } from './utils/findNextCellForReview'
import { getUsers } from '../api/getUsers'
import { UserWithDataForReview } from '../shared/types'
import { splitRowsInState } from './utils/splitRowsInState'
import { markCellAsReviewedInState } from './utils/markCellAsReviewedInState'

const ReviewContext = createContext<ContextType>({
    data: [],
    isLoading: false,
    isError: false,
    nextForReview: null,
    markAsReviewed: () => {},
    splitRows: () => {},
})

const useUser = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })
}

const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [resultData, setResultData] = useState<UserWithDataForReview[]>([])
    const { data, isError, isLoading } = useUser()

    useEffect(() => {
        if (data) {
            const mappedData = mapData(data)
            setResultData(mappedData)
        }
    }, [data])

    const nextForReview = findNextCellForReview(resultData)

    const markAsReviewed = ({ id, fieldName, newValue }: MarkAsReviewParams) =>
        setResultData((prevState) =>
            markCellAsReviewedInState({ state: prevState, fieldName, newValue, id })
        )

    const splitRows = ({ id, fieldName }: CellBasicType) =>
        setResultData((prevState) => splitRowsInState({ state: prevState, fieldName, id }))

    return (
        <ReviewContext.Provider
            value={{
                data: resultData.length ? resultData : [],
                isLoading,
                isError,
                nextForReview,
                markAsReviewed,
                splitRows,
            }}
        >
            {children}
        </ReviewContext.Provider>
    )
}

export { ReviewContext, ReviewProvider }
