import { FC, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { GrLinkNext } from 'react-icons/gr'
import { RiFileCopyLine } from 'react-icons/ri'
import { Station } from '../../../../types/api'
import s from './StationCardExtraOptions.module.scss'

type StationCardExtraOptionsProps = {
	station: Station
	handleGoToPost: (value: string) => void
	onCloseDropDown: () => void
}

const StationCardExtraOptions: FC<StationCardExtraOptionsProps> = ({
	station,
	handleGoToPost,
	onCloseDropDown,
}) => {
	const { shareUrl, prefix } = station
	const [isCopyLink, setIsCopyLink] = useState<boolean>(false)

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl)
			setIsCopyLink(true)
			setTimeout(() => {
				onCloseDropDown()
			}, 700)
		} catch (err) {
			console.error('Ошибка при копировании:', err)
		}
	}

	return (
		<>
			<ul className={s.list}>
				<li className={s.item}>
					<button
						className={s.btn}
						type='button'
						onClick={() => handleGoToPost(prefix)}
					>
						<GrLinkNext size={24} />
						<span className={s.text}>На страницу канала</span>
					</button>
				</li>
				<li className={s.item}>
					<button className={s.btn} type='button'>
						<FaRegHeart size={24} />
						<span className={s.text}>Добавить в избранные</span>
					</button>
				</li>
				<li className={s.item}>
					<button
						className={s.btn}
						type='button'
						onClick={handleCopyLink}
					>
						<RiFileCopyLine size={24} />
						<span className={s.text}>
							{!isCopyLink
								? 'Копировать ссылку на станцию'
								: 'Скопировано'}
						</span>
					</button>
				</li>
			</ul>
		</>
	)
}

export default StationCardExtraOptions
