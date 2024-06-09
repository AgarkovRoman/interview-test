import { UserWithDataForReview } from '../../../shared/types'
import { splitRowsInState } from '../splitRowsInState'

vi.mock('nanoid', async () => {
    const mod = await vi.importActual<typeof import('nanoid')>('nanoid')

    return {
        ...mod,
        nanoid: vi.fn(() => 'unique-id'),
    }
})

describe('splitRowsInState', () => {
    const initialState: UserWithDataForReview[] = [
        {
            id: '1',
            name: { value: 'John Doe', forReview: ['John Smith'], isReviewed: false },
            username: { value: 'jdoe', forReview: [], isReviewed: false },
            phone: { value: '123-456-7890', forReview: [], isReviewed: false },
            website: { value: 'example.com', forReview: [], isReviewed: false },
        },
        {
            id: '2',
            name: { value: 'Jane Doe', forReview: ['Jane Smith'], isReviewed: false },
            username: { value: 'jane_doe', forReview: [], isReviewed: false },
            phone: { value: '123-456-7890', forReview: [], isReviewed: false },
            website: { value: 'example.net', forReview: [], isReviewed: false },
        },
    ]

    it('should correctly split the specified field for the given user ID', () => {
        const newState = splitRowsInState({
            id: '1',
            fieldName: 'name',
            state: initialState,
        })

        expect(newState.length).toBe(3)
        expect(newState[0].name).toEqual({
            value: 'John Doe',
            forReview: [],
            isReviewed: true,
        })
        expect(newState[1].name).toEqual({
            value: 'Jane Doe',
            forReview: ['Jane Smith'],
            isReviewed: false,
        })
        expect(newState[2].name).toEqual({
            value: 'John Smith',
            forReview: [],
            isReviewed: true,
        })
        expect(newState[2].id).toBe('unique-id')
    })

    it('should not update any fields for other users', () => {
        const newState = splitRowsInState({
            id: '1',
            fieldName: 'username',
            state: initialState,
        })

        expect(newState[1]).toEqual(initialState[1])
    })

    it('should correctly handle a non-existent user ID', () => {
        const newState = splitRowsInState({
            id: '3',
            fieldName: 'name',
            state: initialState,
        })

        expect(newState).toEqual(initialState)
    })

    it('should correctly handle a field that is a string', () => {
        const invalidState: UserWithDataForReview[] = [
            {
                id: '1',
                name: 'John Doe' as any,
                username: { value: 'jdoe', forReview: [], isReviewed: false },
                phone: { value: '123-456-7890', forReview: [], isReviewed: false },
                website: { value: 'example.com', forReview: [], isReviewed: false },
            },
        ]

        const newState = splitRowsInState({
            id: '1',
            fieldName: 'name',
            state: invalidState,
        })

        expect(newState).toEqual(invalidState)
    })

    it('should correctly generate new unique IDs for the split rows', () => {
        const newState = splitRowsInState({
            id: '1',
            fieldName: 'name',
            state: initialState,
        })

        expect(newState[2].id).toBe('unique-id')
    })
})
