import { generateCellName } from '../../shared/generateCellName'
import { UserWithDataForReview } from '../../shared/types'

export function findNextValueForReview(data: UserWithDataForReview[]) {
    for (const item of data) {
        for (const [key, value] of Object.entries(item)) {
            // Return cell name if object value has proper structure and if isReviewed is false
            if (value && typeof value === 'object' && 'isReviewed' in value) {
                if (!value.isReviewed) {
                    return generateCellName({ id: item.id, fieldName: key })
                }
            }
        }
    }
    return null // Return null if all values are reviewed
}
