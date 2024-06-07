export type User = {
    id: number
    name: string
    username: string
    phone: string
    website: string
}

export type BasicForReview = {
    value: string
    forReview: string[]
    isReviewed: boolean
}

export type UserWithDataForReview = {
    id: string
    name: BasicForReview
    username: BasicForReview
    phone: BasicForReview
    website: BasicForReview
}
