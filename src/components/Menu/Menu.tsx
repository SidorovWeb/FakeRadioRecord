import { FC, useEffect, useRef, useState } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { IoLogoVk, IoLogoYoutube } from 'react-icons/io5'
import { RiMenu2Fill, RiVipCrownLine } from 'react-icons/ri'
import RadioNavigation from '../RadioNavigation/RadioNavigation'
import s from './Menu.module.scss'

const Menu: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		document.addEventListener('mousedown', clickHandler)

		return () => {
			document.removeEventListener('mousedown', clickHandler)
		}
	}, [isOpen])

	const clickHandler = (event: MouseEvent) => {
		if (
			isOpen &&
			menuRef.current &&
			!menuRef.current.contains(event.target as Node)
		) {
			menuRef.current.classList.remove(`${s.active}`)
			menuRef.current.classList.add(`${s.noActive}`)

			setTimeout(() => {
				setIsOpen(!isOpen)
			}, 200)
		}
	}

	return (
		<div className={s.menuWrapper}>
			<button className={s.menuBtn} onClick={() => setIsOpen(!isOpen)}>
				<RiMenu2Fill size={24} />
			</button>

			{isOpen && (
				<menu
					className={`${s.menu} ${isOpen ? s.active : ''}`}
					ref={menuRef}
				>
					<RadioNavigation />
					<div className={s.listWrapper}>
						<ul className={s.list}>
							<li>
								<a
									href=''
									className={`${s.link} ${s.UpgradePremium}`}
								>
									<RiVipCrownLine size={16} />
									<span> Премиум</span>
								</a>
							</li>
							<li>
								<a href='' className={s.link}>
									Superchart
								</a>
							</li>
							<li>
								<a href='' className={s.link}>
									Club chart
								</a>
							</li>
							<li>
								<a href='' className={s.link}>
									Новости
								</a>
							</li>
						</ul>
						<ul className={s.list}>
							<li>
								<a href='' className={s.link}>
									Новинки эфира
								</a>
							</li>
							<li>
								<a href='' className={s.link}>
									Города вещания
								</a>
							</li>
							<li>
								<a href='' className={s.link}>
									Расписание
								</a>
							</li>
							<li>
								<a href='' className={s.link}>
									Рекламодателям
								</a>
							</li>
						</ul>
						<ul className={s.list}>
							<li>
								<a href='' className={s.link}>
									Про Record
								</a>
							</li>
							<li>
								<a href='' className={s.link}>
									Контакты
								</a>
							</li>
						</ul>
					</div>
					<div className='bottom'>
						<ul className={s.socialNetwork}>
							<li>
								<a href='' className={s.socialNetworkLink}>
									<IoLogoVk size={24} />
								</a>
							</li>
							<li>
								<a href='' className={s.socialNetworkLink}>
									<IoLogoYoutube size={24} />
								</a>
							</li>
							<li>
								<a href='' className={s.socialNetworkLink}>
									<FaTelegramPlane size={24} />
								</a>
							</li>
						</ul>
					</div>
				</menu>
			)}
		</div>
	)
}

export default Menu
