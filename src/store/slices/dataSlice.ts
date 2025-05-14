import { StateCreator } from 'zustand'
import { DataStore } from '../../types/ store'
import { RadioStations, Station } from '../../types/api'

export const createDataSlice: StateCreator<DataStore> = set => ({
	stations: [],
	tags: [],
	genres: [],
	sortedNewestStation: [],
	sortedAlphabetStation: [],
	loading: false,
	error: null,

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
			const genres = data.result.genre
			const sortedNewestStation = [...stations].sort(
				(a, b) => b.id - a.id
			)

			const latinWords: Station[] = []
			const cyrillicWords: Station[] = []
			const numbers: Station[] = []

			stations.forEach(s => {
				if (/^\d/.test(s.title[0])) {
					numbers.push(s) // Поиск цифр
				} else if (/^[a-zA-Z]+$/.test(s.title[0])) {
					latinWords.push(s) // Поиск латинского алфавита
				} else {
					cyrillicWords.push(s) // кириллица и остальное
				}

				numbers.sort((a, b) =>
					a.title.toLowerCase().localeCompare(b.title.toLowerCase())
				)

				latinWords.sort((a, b) =>
					a.title.toLowerCase().localeCompare(b.title.toLowerCase())
				)

				cyrillicWords.sort((a, b) =>
					a.title.toLowerCase().localeCompare(b.title.toLowerCase())
				)
			})

			set({
				stations,
				tags,
				genres,
				sortedNewestStation,
				sortedAlphabetStation: [
					...numbers,
					...latinWords,
					...cyrillicWords,
				],
				loading: false,
			})
		} catch (error) {
			set({ error: 'Failed to fetch data', loading: false })
		}
	},

	changesStationsData: stations => {
		set({ stations })
	},
})
