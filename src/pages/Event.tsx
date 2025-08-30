import { FC } from 'react'
import Banners from '../components/Banners/Banners'
import RadioNavigation from '../components/RadioNavigation/RadioNavigation'

const Event: FC = () => {
	return (
		<div>
			<Banners />
			<RadioNavigation size={4} />
		</div>
	)
}

export default Event
