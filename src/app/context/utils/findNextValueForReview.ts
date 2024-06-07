import { generateCellName } from '../../shared/generateCellName'
import { UserWithDataForReview } from '../../shared/types'

export function findNextValueForReview(data: UserWithDataForReview[]) {
    for (const item of data) {
        for (const [field, details] of Object.entries(item)) {
            if (details && typeof details === 'object' && 'isReviewed' in details) {
                if (!details.isReviewed) {
                    return generateCellName({ id: item.id, fieldName: field })
                }
            }
        }
    }
    return null // Return null if all values are reviewed
}
