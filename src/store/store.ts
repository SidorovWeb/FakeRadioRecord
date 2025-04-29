import { create } from 'zustand'
import { DataStore } from '../types/ store'
import { RadioStations } from '../types/api'

export const useDataStore = create<DataStore>(set => ({
	stations: [],
	tags: [],
	genre: [],
	loading: false,
	error: null,

	// Получение данных

	fetchData: async () => {
		set({ loading: true, error: null })

		try {
			const res = await fetch(
				'https://thingproxy.freeboard.io/fetch/https://www.radiorecord.ru/api/stations',
				{
					headers: {
						Accept: 'application/json',
					},
				}
			)

			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

			const data: RadioStations = await res.json()
			const stations = data.result.stations
			const tags = data.result.tags
			const genre = data.result.genre

			set({ stations, tags, genre, loading: false })
		} catch (error) {
			set({ error: 'Failed to fetch data', loading: false })
		}
	},
}))
