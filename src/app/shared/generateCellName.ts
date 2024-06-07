import { CellBasicType } from '../context/types'

export const generateCellName = ({ id, fieldName }: CellBasicType): string => `${id}_${fieldName}`
