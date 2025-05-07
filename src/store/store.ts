import { create } from 'zustand'
import { DataStore } from '../types/ store'
import { createDataSlice } from './slices/dataSlice'
import { createLayoutSlice, LayoutData } from './slices/layoutSlice'
import { createSortSlice, SortData } from './slices/sortSlice'

export type StoreState = DataStore & SortData & LayoutData

export const useStore = create<StoreState>()((...arg) => ({
	...createDataSlice(...arg),
	...createSortSlice(...arg),
	...createLayoutSlice(...arg),
}))
