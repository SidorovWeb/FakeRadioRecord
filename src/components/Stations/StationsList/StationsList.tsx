import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useStore } from '../../../store/store'
import StationCard from '../StationCard/StationCard'
import s from './StationsList.module.scss'

const StationsList: FC = () => {
	const {
		stations,
		sortedNewestStation,
		sortedAlphabetStation,
		sortedBy,
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
		if (sortedBy === 'newest') {
			setFilteredStations([...sortedNewestStation])
			return
		}

		if (sortedBy === 'alphabet') {
			setFilteredStations([...sortedAlphabetStation])
			return
		}

		setFilteredStations([...stations])
	}, [stations, sortedBy])

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
