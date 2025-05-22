import { create } from 'zustand'
import { DataBanners, DataStore } from '../types/ store'
import { createDataBannersSlice } from './slices/dataBannersSlice'
import { createDataSlice } from './slices/dataSlice'
import {
	createGenresFilterSlice,
	SortedByGenres,
} from './slices/genresFilterSlice'
import { createLayoutSlice, LayoutData } from './slices/layoutSlice'
import { createSortSlice, SortData } from './slices/sortSlice'

export type StoreState = DataStore &
	SortData &
	LayoutData &
	SortedByGenres &
	DataBanners

export const useStore = create<StoreState>()((...arg) => ({
	...createDataSlice(...arg),
	...createSortSlice(...arg),
	...createLayoutSlice(...arg),
	...createGenresFilterSlice(...arg),
	...createDataBannersSlice(...arg),
}))
