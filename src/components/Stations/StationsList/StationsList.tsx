import cn from 'classnames'
import { FC, useEffect, useState, useMemo, useCallback } from 'react'
import { useStore } from '../../../store/store'
import { Station } from '../../../types/api'
import StationCard from '../StationCard/StationCard'
import s from './StationsList.module.scss'

const StationsList: FC = () => {
	const {
		stations,
		sortedBy,
		sortedByGenres,
		stationsLoading,
		stationsError,
		isGrid,
		fetchData,
	} = useStore()
	const emptyData = useStore(state => state.stations.length === 0)
	const [activeId, setActiveId] = useState<number | null>(null)

	useEffect(() => {
		if (!emptyData) {
			return
		}
		if (!stations.length) {
			fetchData()
		}
	}, [fetchData, emptyData])


	const filterByGenres = useCallback((stations: Station[]): Station[] => {
		if (sortedByGenres.style && sortedByGenres.id) {
			return stations.filter(station =>
				station.genre.some(s => s.name === sortedByGenres.id)
			)
		}
		return stations
	}, [sortedByGenres.style, sortedByGenres.id])

	const sortByNewest = useCallback((stations: Station[]): Station[] => {
		return [...stations].sort((a, b) => b.id - a.id)
	}, [])

	const sortByAlphabet = useCallback((stations: Station[]): Station[] => {
		const latinWords: Station[] = []
		const cyrillicWords: Station[] = []
		const numbers: Station[] = []

		stations.forEach(station => {
			const firstChar = station.title?.[0]
			if (!firstChar) {
				cyrillicWords.push(station)
				return
			}

			if (/^\d$/.test(firstChar)) {
				numbers.push(station) // Поиск цифр
			} else if (/^[a-zA-Z]$/.test(firstChar)) {
				latinWords.push(station) // Поиск латинского алфавита
			} else {
				cyrillicWords.push(station) // кириллица и остальное
			}
		})

		const sortByTitle = (a: Station, b: Station) =>
			a.title.toLowerCase().localeCompare(b.title.toLowerCase())

		numbers.sort(sortByTitle)
		latinWords.sort(sortByTitle)
		cyrillicWords.sort(sortByTitle)

		return [...numbers, ...latinWords, ...cyrillicWords]
	}, [])


	const filteredStations = useMemo(() => {	
		if (!stations.length) return []
		let result = filterByGenres(stations)
		
		switch (sortedBy.id) {
			case 'newest':
				return sortByNewest(result)
			case 'alphabet':
				return sortByAlphabet(result)
			default:
				return result
		}
	}, [stations, sortedBy.id, sortedByGenres, filterByGenres, sortByNewest, sortByAlphabet])

	if (stationsLoading) return <div className={s.loading}>Loading podcasts...</div>
	if (stationsError) return <div className={s.error}>Error: {stationsError}</div>

	const handleCardClick = (id: number) => {
		setActiveId(prevId => (prevId === id ? null : id))
	}

	return (
		<ul className={cn(s.list, { [s.columns]: !isGrid })}>
			{filteredStations.map(station => (
				<li key={station.id}>
					<StationCard
						station={station}
						isActive={activeId === station.id}
						onClick={handleCardClick}
					/>
				</li>
			))}
		</ul>
	)
}

export default StationsList
