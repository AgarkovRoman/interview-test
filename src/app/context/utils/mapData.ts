import { nanoid } from 'nanoid'
import { User, UserWithDataForReview } from '../../shared/types'

export const mapData = (data: User[]): UserWithDataForReview[] => {
    return data.map((user) => ({
        ...user,
        id: nanoid(),
        name: {
            value: user.name,
            forReview: ['alt-name-1', 'alt-name-2'],
            isReviewed: false,
        },
        phone: {
            value: user.phone,
            forReview: ['alt-phone-1', 'alt-phone-2'],
            isReviewed: false,
        },
        website: {
            value: user.website,
            forReview: ['alt-website-1', 'alt-website-2'],
            isReviewed: false,
        },
        username: {
            value: user.username,
            forReview: ['alt-username-1', 'alt-username-2'],
            isReviewed: false,
        },
    }))
}
