import { StateCreator } from 'zustand'

export type SortOptionState = 'popular' | 'alphabet' | 'newest'

export type SortedBy = {
	id: SortOptionState
	name: string
}

export type SortData = {
	sortedBy: SortedBy
	changesSorting: (sort: SortedBy) => void
}

export const createSortSlice: StateCreator<SortData> = set => ({
	sortedBy: {
		id: 'popular',
		name: 'По популярности',
	},

	changesSorting: sort => {
		set({ sortedBy: sort })
	},
})
