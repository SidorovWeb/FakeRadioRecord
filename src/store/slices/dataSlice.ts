import { StateCreator } from 'zustand'
import { fetchWithProxyRetry } from '../../services/fetchWithProxyRetry'
import { DataStore } from '../../types/ store'
import { RadioStations } from '../../types/api'

export const createDataSlice: StateCreator<DataStore> = set => ({
	stations: [],
	tags: [],
	genres: [],
	stationsLoading: false,
	stationsError: null,

	fetchData: async () => {
		set({ stationsLoading: true, stationsError: null })

		try {
			const data: RadioStations = await fetchWithProxyRetry('stations')
			const stations = data.result.stations
			const tags = data.result.tags
			const genres = data.result.genre
			set({
				stations,
				tags,
				genres,
				stationsLoading: false,
			})
		} catch (error) {
			set({ stationsError: 'Failed to fetch stations data', stationsLoading: false })
		}
	},

	changesStationsData: stations => {
		set({ stations })
	},
})
