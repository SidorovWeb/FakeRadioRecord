import cn from 'classnames'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './RadioNavigation.module.scss'

interface Navigation {
	size?: number
	gap?: number
}

interface NavKey {
	title: string
	to: string
}

const RadioNavigation: FC<Navigation> = ({ size = 3.6, gap = 4 }) => {
	const nav: NavKey[] = [
		{ title: 'Каналы', to: '/' },
		{ title: 'Подкасты', to: '/podcast' },
		{ title: 'События', to: '/event' },
	]

	return (
		<nav className={s.nav}>
			<ul className={s.navList} style={{ gap: `${gap}rem` }}>
				{nav.map((title, id) => (
					<li key={id}>
						<NavLink
							to={title.to}
							className={({ isActive }) =>
								cn(s.navListLink, { [s.activeLink]: isActive })
							}
							style={{ fontSize: `${size}rem` }}
						>
							{title.title}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default RadioNavigation
