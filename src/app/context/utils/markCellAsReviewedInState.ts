import { UserWithDataForReview } from '../../shared/types'
import { MarkAsReviewParams } from '../types'

type Params = MarkAsReviewParams & { state: UserWithDataForReview[] }

export const markCellAsReviewedInState = ({ id, fieldName, newValue, state }: Params) => {
    return state.map((user) => {
        if (user.id === id) {
            const fieldValue = user[fieldName as keyof UserWithDataForReview]

            if (fieldValue && typeof fieldValue === 'object' && 'isReviewed' in fieldValue) {
                return {
                    ...user,
                    [fieldName]: {
                        value: newValue,
                        forReview: [],
                        isReviewed: true,
                    },
                }
            }
        }
        return user
    })
}
