import { create } from 'zustand'
import { DataStore } from '../types/ store'
import { createDataSlice } from './slices/dataSlice'
import { createSortSlice, SortData } from './slices/sortSlice'

export type StoreState = DataStore & SortData

export const useStore = create<StoreState>()((...arg) => ({
	...createDataSlice(...arg),
	...createSortSlice(...arg),
}))
