import { StateCreator } from 'zustand'

export type SortOptionGenresState = {
	id: string
	name: string
	style: 'genre' | 'tags' | null
}

export type SortedByGenres = {
	sortedByGenres: SortOptionGenresState
	changesSortingByGenre: (sortedByGenres: SortOptionGenresState) => void
}

export const createGenresFilterSlice: StateCreator<SortedByGenres> = set => ({
	sortedByGenres: { id: '', name: '', style: null },

	changesSortingByGenre: sort => {
		set({ sortedByGenres: sort })
	},
})
