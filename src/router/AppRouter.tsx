import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Event from '../pages/Event'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import Podcasts from '../pages/Podcasts/Podcasts'
import StationDetails from '../pages/StationDetails'
import Stations from '../pages/Stations'

const AppRouter: FC = () => {
	return (
		<Routes>
			{/* Публичные маршруты */}
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/podcast' element={<Podcasts />} />
			<Route path='/event' element={<Event />} />
			<Route path='/stations' element={<Stations />} />
			<Route path='/station/:stationSlug' element={<StationDetails />} />

			{/* Приватные маршруты */}
			{/* <Route
				path='/dashboard'
				element={
					<PrivateRoute>
						<PrivatePage />
					</PrivateRoute>
				}
			/> */}

			{/* Дополнительные маршруты */}
			<Route path='/404' element={<NotFoundPage />} />
			<Route path='*' element={<Navigate to='/404' replace />} />
		</Routes>
	)
}

export default AppRouter
