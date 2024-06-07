import { nanoid } from 'nanoid'
import { CellBasicType } from '../types'
import { BasicForReview, UserWithDataForReview } from '../../shared/types'

type Params2 = CellBasicType & { state: UserWithDataForReview[] }

export const splitRowsInState = ({ id, fieldName, state }: Params2) => {
    const itemToSplit = state.find((user) => user.id === id)

    if (!itemToSplit) {
        return state
    }

    const fieldToCopy = itemToSplit[fieldName as keyof UserWithDataForReview]

    if (typeof fieldToCopy === 'string') {
        // If the field is a literal, return the state unchanged
        return state
    }

    const initialCell: BasicForReview = {
        value: fieldToCopy.value,
        forReview: [],
        isReviewed: true,
    }
    const initialItem = { ...itemToSplit, [fieldName]: initialCell }

    const alternativeItems = fieldToCopy.forReview.map((el) => ({
        ...itemToSplit,
        id: nanoid(),
        [fieldName]: { value: el, forReview: [], isReviewed: true },
    }))

    const newState = state.map((user) => (user.id === id ? initialItem : user))

    // For simplicity, the new values are added to the end of the result array
    return [...newState, ...alternativeItems]
}
