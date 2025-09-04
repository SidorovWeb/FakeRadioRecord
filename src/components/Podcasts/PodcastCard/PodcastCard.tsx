import { FC, useEffect, useRef } from 'react'
import { PodcastsResult } from '../../../types/api'
import s from './PodcastCard.module.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import { usePositionCheck } from '../../../hooks/usePositionCheck '
import cn from 'classnames'
import { motion, useIsPresent } from 'framer-motion'

interface PodcastCardProps {
	podcast: PodcastsResult
}

export const PodcastCard: FC<PodcastCardProps> = ({ podcast }) => {
	const elementRef = useRef<HTMLAnchorElement>(null)
	const { isAlignRight, checkPosition } = usePositionCheck(true, elementRef)
	const isPresent = useIsPresent()
	const animations = {
		style: {
			position: isPresent ? 'static' : 'absolute',
		},
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { stiffness: 400 },
	}

	useEffect(() => {
		checkPosition()
	}, [])

	useEffect(() => {
		window.addEventListener('resize', checkPosition)

		return () => window.removeEventListener('resize', checkPosition)
	}, [checkPosition])

	return (
		<motion.article {...(animations as any)} layout className={s.element}>
			<a className={s.card} href="#" ref={elementRef}>
				<div className={s.blockSubscribe}>
					<button className={s.btnSubscribe}>
						<AiOutlinePlus size={19} />
					</button>
					<span
						className={cn(s.textBtnSubscribe, {
							[s.textBtnSubscribeRight]: isAlignRight,
						})}
					>
						Подписаться
					</span>
				</div>
				<h3 className={s.blockText}>
					{podcast.is_new ? <span className={s.textNew}>New</span> : ''}
					<span>{podcast.name}</span>
				</h3>
				<div
					className={s.imgBackground}
					style={{
						backgroundImage: `url(${podcast.cover_vertical})`,
					}}
				></div>
			</a>
		</motion.article>
	)
}
