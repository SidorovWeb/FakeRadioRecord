import { create } from 'zustand'
import { DataBanners, DataPodcasts, DataStore } from '../types/ store'
import { createDataBannersSlice } from './slices/dataBannersSlice'
import { createDataPodcastsSlice } from './slices/dataPodcastsSlice'
import { createDataSlice } from './slices/dataSlice'
import {
	createGenresFilterSlice,
	SortedByGenres,
} from './slices/genresFilterSlice'
import { createLayoutSlice, LayoutData } from './slices/layoutSlice'
import { createSortSlice, SortData } from './slices/sortSlice'
import { createSubscribeSlice, SubscribeData } from './slices/subscribeSlice'

export type StoreState = DataStore &
	SortData &
	LayoutData &
	SortedByGenres &
	DataBanners &
	DataPodcasts &
	SubscribeData

export const useStore = create<StoreState>()((...arg) => ({
	...createDataSlice(...arg),
	...createSortSlice(...arg),
	...createLayoutSlice(...arg),
	...createGenresFilterSlice(...arg),
	...createDataBannersSlice(...arg),
	...createDataPodcastsSlice(...arg),
	...createSubscribeSlice(...arg),
}))
