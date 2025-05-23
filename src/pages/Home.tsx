import { FC } from 'react'
import Banners from '../components/Banners/Banners'
import QuickFilters from '../components/QuickFilters/QuickFilters'
import RadioNavigation from '../components/RadioNavigation/RadioNavigation'
import StationsList from '../components/Stations/StationsList/StationsList'

const Home: FC = () => {
	return (
		<div>
			<Banners />
			<RadioNavigation size={4} />
			<QuickFilters />
			<StationsList />
		</div>
	)
}

export default Home
