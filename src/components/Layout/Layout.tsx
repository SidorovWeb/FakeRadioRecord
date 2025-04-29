import { FC, PropsWithChildren } from 'react'
import AppRouter from '../../router/AppRouter'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import s from './Layout.module.scss'

const Layout: FC<PropsWithChildren<unknown>> = () => {
	return (
		<div className={s.container}>
			<div className={s.grid}>
				<Header />
				<main>
					<AppRouter />
				</main>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
