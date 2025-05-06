import { StateCreator } from 'zustand'

export type SortOptionState = 'popular' | 'alphabet' | 'newest'

export type SortData = {
	sortedBy: SortOptionState
	changesSorting: (sort: SortOptionState) => void
}

export const createSortSlice: StateCreator<SortData> = set => ({
	sortedBy: 'popular',

	changesSorting: sort => {
		set({ sortedBy: sort })
	},
})
