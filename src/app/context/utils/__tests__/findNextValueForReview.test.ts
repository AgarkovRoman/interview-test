import { UserWithDataForReview } from '../../../shared/types'
import { findNextCellForReview } from '../findNextCellForReview'

const first: UserWithDataForReview = {
    id: '1',
    name: { value: 'Leanne Graham', forReview: ['name-for-review'], isReviewed: false },
    username: { value: 'Bret', forReview: ['username-for-review'], isReviewed: true },
    phone: { value: 'phone-1', forReview: ['phone-for-review'], isReviewed: false },
    website: { value: 'website-1', forReview: ['website-for-review'], isReviewed: false },
}

const second: UserWithDataForReview = {
    id: '2',
    name: { value: 'name-user-2', forReview: ['name-for-review-2'], isReviewed: true },
    username: {
        value: 'username-user-2',
        forReview: ['username-for-review-2'],
        isReviewed: false,
    },
    phone: { value: 'phone-user-2', forReview: ['phone-for-review-2'], isReviewed: false },
    website: {
        value: 'website-user-2',
        forReview: ['website-for-review-2'],
        isReviewed: false,
    },
}

const sampleData: UserWithDataForReview[] = [first, second]

describe('findNextCellForReview', () => {
    it('should return the first unreviewed value', () => {
        const result = findNextCellForReview(sampleData)

        expect(result).toBe('1_name')
    })

    it('should return the next unreviewed value if the first one is reviewed', () => {
        const updatedSampleData = [
            {
                id: '1',
                name: { value: 'Leanne Graham', forReview: ['name-for-review'], isReviewed: true },
                username: { value: 'Bret', forReview: ['username-for-review'], isReviewed: true },
                phone: { value: 'phone-1', forReview: ['phone-for-review'], isReviewed: true },
                website: {
                    value: 'website-1',
                    forReview: ['website-for-review'],
                    isReviewed: true,
                },
            },
            second,
        ]
        const result = findNextCellForReview(updatedSampleData)

        expect(result).toBe('2_username')
    })

    it('should return null if all values are reviewed', () => {
        const reviewedData = [
            {
                id: '1',
                name: { value: 'Leanne Graham', forReview: ['name-for-review'], isReviewed: true },
                username: { value: 'Bret', forReview: ['username-for-review'], isReviewed: true },
                phone: { value: 'phone-1', forReview: ['phone-for-review'], isReviewed: true },
                website: {
                    value: 'website-1',
                    forReview: ['website-for-review'],
                    isReviewed: true,
                },
            },
            {
                id: '2',
                name: { value: 'name-user-2', forReview: ['name-for-review-2'], isReviewed: true },
                username: {
                    value: 'username-user-2',
                    forReview: ['username-for-review-2'],
                    isReviewed: true,
                },
                phone: {
                    value: 'phone-user-2',
                    forReview: ['phone-for-review-2'],
                    isReviewed: true,
                },
                website: {
                    value: 'website-user-2',
                    forReview: ['website-for-review-2'],
                    isReviewed: true,
                },
            },
        ]
        const result = findNextCellForReview(reviewedData)

        expect(result).toBeNull()
    })

    it('should return null if data is empty', () => {
        const emptyData: UserWithDataForReview[] = []
        const result = findNextCellForReview(emptyData)

        expect(result).toBeNull()
    })
})
