import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import LoginBtn from '../LoginBtn/LoginBtn'
import Logo from '../Logo/Logo'
import Menu from '../Menu/Menu'
import Search from '../Search/Search'
import UpgradePremium from '../UpgradePremium/UpgradePremium'
import s from './Header.module.scss'

const Header: FC = () => {
	const [isSticky, setIsSticky] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 80 && !isSticky) {
				setIsSticky(true)
			} else if (window.scrollY < 60 && isSticky) {
				setIsSticky(false)
			}
		}

		// Добавляем слушатель события прокрутки
		window.addEventListener('scroll', handleScroll)

		// Очищаем слушатель при размонтировании компонента
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [isSticky])

	return (
		<header className={cn(s.header, { [s.sticky]: isSticky })}>
			<div className={s.container}>
				<div className={s.wrapper}>
					<div className={s.leftSide}>
						<Logo sticky={isSticky} />
						<Menu />
						<Search />
					</div>
					<div className={s.rightSide}>
						<UpgradePremium />
						<LoginBtn />
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
