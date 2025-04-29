import cn from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { Station } from '../../../types/api'
import Dropdown from '../../Dropdown/Dropdown'
import s from './StationCard.module.scss'
import StationCardExtraOptions from './StationCardExtraOptions/StationCardExtraOptions'

type StationCardProps = {
	station: Station
	isActive: boolean
	onClick: (id: number) => void
}

const StationCard: FC<StationCardProps> = ({ station, isActive, onClick }) => {
	const { id, title, svg_outline, svg_fill } = station
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)
	const parentRef = useRef<HTMLDivElement | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (!isOpenDropdown) {
			closesDropdown()
		}
	}, [isVisible])

	const handleDotsClick = () => {
		if (isVisible) {
			closesDropdown()
			return
		}

		setIsVisible(true)
		setIsOpenDropdown(true)
	}

	const closesDropdown = () => {
		setIsOpenDropdown(false)
		setTimeout(() => {
			setIsVisible(false)
		}, 300)
	}

	const handleGoToPost = (stationSlug: string) => {
		navigate(`/station/${stationSlug}`)
	}

	return (
		<div
			className={cn(s.cardWrapper, { [s.isActive]: isActive })}
			ref={parentRef}
		>
			<button
				type='button'
				className={s.card}
				onClick={() => onClick(id)}
			>
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
			{isVisible && (
				<Dropdown
					isVisible={isVisible}
					setIsVisible={setIsVisible}
					isOpenDropdown={isOpenDropdown}
					parentRef={parentRef}
					isPosition={true}
				>
					<StationCardExtraOptions
						station={station}
						handleGoToPost={handleGoToPost}
						setIsOpenDropdown={setIsOpenDropdown}
					/>
				</Dropdown>
			)}
		</div>
	)
}

export default StationCard
