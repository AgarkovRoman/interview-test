import { UserWithDataForReview } from '../../../shared/types'
import { markCellAsReviewedInState } from '../markCellAsReviewedInState'

describe('markCellAsReviewedInState', () => {
    const initialState: UserWithDataForReview[] = [
        {
            id: '1',
            name: { value: 'John Doe', forReview: ['John Smith'], isReviewed: false },
            username: { value: 'jdoe', forReview: ['jsmith'], isReviewed: false },
            phone: { value: '123-456-7890', forReview: ['098-765-4321'], isReviewed: false },
            website: { value: 'example.com', forReview: ['example.org'], isReviewed: false },
        },
        {
            id: '2',
            name: { value: 'Jane Doe', forReview: ['Jane Smith'], isReviewed: false },
            username: { value: 'jane_doe', forReview: ['jane_smith'], isReviewed: false },
            phone: { value: '123-456-7890', forReview: ['098-765-4321'], isReviewed: false },
            website: { value: 'example.net', forReview: ['example.org'], isReviewed: false },
        },
    ]

    it('should correctly update the specified field for the given user ID', () => {
        const newState = markCellAsReviewedInState({
            id: '1',
            fieldName: 'name',
            newValue: 'John Smith',
            state: initialState,
        })

        expect(newState[0].name).toEqual({
            value: 'John Smith',
            forReview: [],
            isReviewed: true,
        })
        expect(newState[1]).toEqual(initialState[1])
    })

    it('should not update any fields for other users', () => {
        const newState = markCellAsReviewedInState({
            id: '1',
            fieldName: 'username',
            newValue: 'new_username',
            state: initialState,
        })

        expect(newState[1]).toEqual(initialState[1])
    })

    it('should correctly handle a non-existent user ID', () => {
        const newState = markCellAsReviewedInState({
            id: '3',
            fieldName: 'name',
            newValue: 'Non Existent',
            state: initialState,
        })

        expect(newState).toEqual(initialState)
    })

    it('should correctly handle a non-existent field', () => {
        const newState = markCellAsReviewedInState({
            id: '1',
            fieldName: 'nonExistentField' as keyof UserWithDataForReview,
            newValue: 'Non Existent',
            state: initialState,
        })

        expect(newState).toEqual(initialState)
    })
})
