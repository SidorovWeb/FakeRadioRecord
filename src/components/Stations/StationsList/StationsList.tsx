import { FC, useEffect, useState } from 'react'
import { useDataStore } from '../../../store/store'
import StationCard from '../StationCard/StationCard'
import s from './StationsList.module.scss'

const StationsList: FC = () => {
	const { stations, loading, error, fetchData } = useDataStore()
	const emptyData = useDataStore(state => state.stations.length === 0)
	const [activeId, setActiveId] = useState<number | null>(null)

	useEffect(() => {
		if (!emptyData) {
			return
		}

		fetchData()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

	const handleCardClick = (id: number) => {
		setActiveId(prevId => (prevId === id ? null : id))
	}

	return (
		<ul className={s.list}>
			{stations.map(station => (
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
