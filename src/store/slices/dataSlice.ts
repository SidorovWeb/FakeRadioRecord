import { StateCreator } from 'zustand'
import { DataStore } from '../../types/ store'
import { RadioStations, Station } from '../../types/api'

export const createDataSlice: StateCreator<DataStore> = set => ({
	stations: [],
	tags: [],
	genre: [],
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
			const genre = data.result.genre
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
				genre,
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
})

// return titles.sort((a, b) => {
//   // Определяем приоритет для каждой строки
//   const getPriority = (title) => {
//       if (/^\d/.test(title)) return [0, title.toLowerCase()]; // Цифры
//       if (/^[a-zA-Z]/.test(title)) return [1, title.toLowerCase()]; // Английские
//       return [2, title.toLowerCase()]; // Русские и прочие
//   };

//   const [priorityA, valueA] = getPriority(a);
//   const [priorityB, valueB] = getPriority(b);

//   // Сравниваем по приоритету, затем по алфавиту
//   if (priorityA !== priorityB) {
//       return priorityA - priorityB;
//   }
//   return valueA.localeCompare(valueB);
// });

// function sortAlphabetically(arr) {
//   return arr.sort((a, b) => {
//     // Определяем категории для каждого элемента
//     const getCategory = (str) => {
//       if (/^\d+$/.test(str)) return 0; // Только цифры
//       if (/^[a-zA-Z]+$/.test(str)) return 1; // Только английские буквы
//       return 2; // Русские или смешанные (русские будут последними)
//     };

//     const categoryA = getCategory(a);
//     const categoryB = getCategory(b);

//     // Сначала сравниваем категории
//     if (categoryA !== categoryB) {
//       return categoryA - categoryB;
//     }

//     // Если категории одинаковые, сортируем по алфавиту
//     return a.localeCompare(b, undefined, { sensitivity: 'base' });
//   });
// }
