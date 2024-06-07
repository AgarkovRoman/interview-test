import { UserWithDataForReview } from '../shared/types'

export type CellBasicType = {
    id: string
    fieldName: string
}

export type MarkAsReviewParams = CellBasicType & {
    newValue: string
}

export type ContextType = {
    data: UserWithDataForReview[]
    isLoading: boolean
    isError: boolean
    nextForReview: string | null
    markAsReviewed: ({ id, fieldName, newValue }: MarkAsReviewParams) => void
    splitRows: ({ id, fieldName }: CellBasicType) => void
}
