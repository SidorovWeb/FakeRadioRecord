import cn from 'classnames'
import { FC } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { IoLogoVk, IoLogoYoutube } from 'react-icons/io'
import { RiVipCrownLine } from 'react-icons/ri'

import s from './Footer.module.scss'

const Footer: FC = () => {
	return (
		<footer className={s.footer}>
			<div className={s.container}>
				<div className={s.wrapper}>
					<div className={s.leftSide}>
						<ul className={s.list}>
							<li>
								<a href='#' className={s.link}>
									Главная
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Каналы
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Подкасты
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									События
								</a>
							</li>
							<li>
								<a
									href='#'
									className={cn(s.link, s.upgradePremium)}
								>
									<RiVipCrownLine size={16} />{' '}
									<span>Премиум</span>
								</a>
							</li>
						</ul>
						<ul className={s.list}>
							<li>
								<a href='#' className={s.link}>
									Superchart
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Club chart
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Новинки эфира
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Новости
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Города вещания
								</a>
							</li>
						</ul>
						<ul className={s.list}>
							<li>
								<a href='#' className={s.link}>
									Расписание
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Рекламодателям
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Про Record
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Контакты
								</a>
							</li>
						</ul>
						<ul className={s.list}>
							<li>
								<a href='#' className={s.link}>
									Связь с разработчиками{' '}
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Лицензионное соглашение{' '}
								</a>
							</li>
							<li>
								<a href='#' className={s.link}>
									Политика конфиденциальности{' '}
								</a>
							</li>
						</ul>
					</div>
					<div className={s.rightSide}>
						<div className={s.socials}>
							<ul className={s.socialNetwork}>
								<li>
									<a href='' className={s.socialNetworkLink}>
										<IoLogoVk size={32} />
									</a>
								</li>
								<li>
									<a href='' className={s.socialNetworkLink}>
										<IoLogoYoutube size={24} />
									</a>
								</li>
								<li>
									<a href='' className={s.socialNetworkLink}>
										<FaTelegramPlane size={28} />
									</a>
								</li>
							</ul>
						</div>
						<div className={s.shops}>
							<ul className={s.shopsList}>
								<li>
									<a href='#'>
										<img
											src='../../../public/icons/GooglePlay.svg'
											alt='Google Play Icon'
										/>
									</a>
								</li>
								<li>
									<a href='#'>
										<img
											src='../../../public/icons/AppleStore.svg'
											alt='Google Play Icon'
										/>
									</a>
								</li>
								<li>
									<a href='#'>
										<img
											src='../../../public/icons/AppGallery.svg'
											alt='Google Play Icon'
										/>
									</a>
								</li>
							</ul>
						</div>
						<div className={s.copyright}>
							© 1997–{new Date().getFullYear()} Radio Record
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
