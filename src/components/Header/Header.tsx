import { FC } from 'react'

import LoginBtn from '../LoginBtn/LoginBtn'
import Logo from '../Logo/Logo'
import Menu from '../Menu/Menu'
import Search from '../Search/Search'
import UpgradePremium from '../UpgradePremium/UpgradePremium'
import s from './Header.module.scss'

const Header: FC = () => {
	return (
		<header className={s.header}>
			<div className={s.wrapper}>
				<div className={s.leftSide}>
					<Logo />
					<Menu />
					<Search />
				</div>
				<div className={s.rightSide}>
					<UpgradePremium />
					<LoginBtn />
				</div>
			</div>
		</header>
	)
}

export default Header
