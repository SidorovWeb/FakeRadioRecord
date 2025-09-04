import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'
import AppRouter from '../../router/AppRouter'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import s from './Layout.module.scss'
import { Subscribe } from '../Subscribe/Subscribe'

const Layout: FC<PropsWithChildren<unknown>> = () => {
	return (
		<div className={s.grid}>
			<Header />
			<main className={cn(s.container, s.main)}>
				<AppRouter />
			</main>
			<Footer />
			<Subscribe />
		</div>
	)
}

export default Layout
