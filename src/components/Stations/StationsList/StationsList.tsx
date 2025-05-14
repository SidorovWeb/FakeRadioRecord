import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useStore } from '../../../store/store'
import { Station } from '../../../types/api'
import StationCard from '../StationCard/StationCard'
import s from './StationsList.module.scss'

const StationsList: FC = () => {
	const {
		stations,
		sortedBy,
		sortedByGenres,
		loading,
		error,
		isGrid,
		fetchData,
	} = useStore()
	const emptyData = useStore(state => state.stations.length === 0)
	const [activeId, setActiveId] = useState<number | null>(null)
	const [filteredStations, setFilteredStations] = useState([...stations])

	useEffect(() => {
		if (!emptyData) {
			return
		}

		fetchData()
	}, [])

	useEffect(() => {
		let result: Station[] = [...stations]

		if (sortedByGenres.style && sortedByGenres.id) {
			result = stations.filter(station =>
				station.genre.some(s => s.name === sortedByGenres.id)
			)
		}

		if (sortedBy.id === 'newest') {
			result = [...result].sort((a, b) => b.id - a.id)
		}

		if (sortedBy.id === 'alphabet') {
			const latinWords: Station[] = []
			const cyrillicWords: Station[] = []
			const numbers: Station[] = []

			result.forEach(s => {
				if (/^\d/.test(s.title[0])) {
					numbers.push(s) // Поиск цифр
				} else if (/^[a-zA-Z]+$/.test(s.title[0])) {
					latinWords.push(s) // Поиск латинского алфавита
				} else {
					cyrillicWords.push(s) // кириллица и остальное
				}
			})

			numbers.sort((a, b) =>
				a.title.toLowerCase().localeCompare(b.title.toLowerCase())
			)

			latinWords.sort((a, b) =>
				a.title.toLowerCase().localeCompare(b.title.toLowerCase())
			)

			cyrillicWords.sort((a, b) =>
				a.title.toLowerCase().localeCompare(b.title.toLowerCase())
			)

			result = [...numbers, ...latinWords, ...cyrillicWords]
		}

		setFilteredStations(result)
	}, [stations, sortedBy, sortedByGenres])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

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
