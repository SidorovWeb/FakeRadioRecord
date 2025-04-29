import { FC } from 'react'
import { useParams } from 'react-router-dom'

const StationDetails: FC = () => {
	const { stationSlug } = useParams<{ stationSlug: string }>()

	return (
		<div>
			<div>
				<h1>station Details</h1>
				<p>Station Slug: {stationSlug}</p>
			</div>
		</div>
	)
}

export default StationDetails
