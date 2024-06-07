import { useContext } from 'react'
import { ReviewContext } from './ReviewContext'

export const useDataContext = () => useContext(ReviewContext)
