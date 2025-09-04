import cn from 'classnames'
import { FC, useRef, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../store/store'
import { Station } from '../../../types/api'
import Dropdown from '../../Dropdown/Dropdown'
import s from './StationCard.module.scss'
import StationCardExtraOptions from './StationCardExtraOptions/StationCardExtraOptions'
import { motion, useIsPresent } from 'framer-motion'

interface StationCardProps {
	station: Station
	isActive: boolean
	onClick: (id: number) => void
}

const StationCard: FC<StationCardProps> = ({ station, isActive, onClick }) => {
	const navigate = useNavigate()
	const { id, title, svg_outline, svg_fill } = station
	const parentRef = useRef<HTMLDivElement | null>(null)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const openDropdown = () => setIsDropdownOpen(true)
	const closeDropdown = () => setIsDropdownOpen(false)
	const { isGrid } = useStore()
	const isPresent = useIsPresent()
	const animations = {
		style: {
			position: isPresent ? 'static' : 'absolute',
		},
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { stiffness: 400 },
	}

	const handleDotsClick = () => {
		if (isDropdownOpen) {
			closeDropdown()
			return
		}
		openDropdown()
	}

	const handleGoToPost = (stationSlug: string) => {
		navigate(`/station/${stationSlug}`)
	}

	return (
		<motion.div
			{...(animations as any)}
			layout
			className={cn(
				s.cardWrapper,
				{ [s.isActive]: isActive },
				{ [s.columns]: !isGrid }
			)}
			ref={parentRef}
		>
			{station.new ? <span className={s.textNew}>New</span> : ''}
			<button type="button" className={s.card} onClick={() => onClick(id)}>
				<div
					className={s.cardIcon}
					dangerouslySetInnerHTML={{
						__html: isActive ? svg_fill : svg_outline,
					}}
				/>

				<div className={`text ${s.cardText}`}>{title}</div>
			</button>
			<BiDotsVerticalRounded
				className={s.cardDotsVertical}
				size={24}
				onClick={handleDotsClick}
			/>

			<Dropdown
				isOpen={isDropdownOpen}
				onClose={closeDropdown}
				parentRef={parentRef}
				alignRight={isGrid && true}
				right={!isGrid && true}
			>
				<StationCardExtraOptions
					station={station}
					handleGoToPost={handleGoToPost}
					onCloseDropDown={closeDropdown}
				/>
			</Dropdown>
		</motion.div>
	)
}

export default StationCard
