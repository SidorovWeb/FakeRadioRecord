import { FC, useState } from 'react'
import { BsCheck2 } from 'react-icons/bs'
import { PiArrowsDownUpBold } from 'react-icons/pi'
import Banners from '../../components/Banners/Banners'
import Dropdown from '../../components/Dropdown/Dropdown'
import SortFilter from '../../components/QuickFilters/SortFilter/SortFilter'
import RadioNavigation from '../../components/RadioNavigation/RadioNavigation'
import DynamicButton from '../../components/UI/DynamicButton/DynamicButton'
import { SortedBy } from '../../store/slices/sortSlice'
import s from './Podcasts.module.scss'
import PodcastList from '../../components/Podcasts/PodcastList/PodcastList'
import { useStore } from '../../store/store'

const Podcasts: FC = () => {
	const [activeDropdown, setActiveDropdown] = useState<
		'popularity' | 'genres' | null
	>(null)
	const [sortedBy, setSortedBy] = useState<SortedBy>({
		id: 'popular',
		name: 'По популярности',
	})
	const { handleSubscribe } = useStore()

	const openDropdown = (type: 'popularity' | 'genres' | null) => {
		setActiveDropdown(type)
	}
	const closeDropdown = () => setActiveDropdown(null)

	const handleSelect = (option: SortedBy) => {
		setSortedBy(option)
		closeDropdown()
	}

	return (
		<div>
			<Banners />
			<RadioNavigation size={4} />
			<div className={s.podcastFilters}></div>
			<ul className={s.podcastList}>
				<li>
					<DynamicButton
						style={{
							padding: '.9rem',
							justifyContent: 'center',
						}}
						white
						svgIcon={<PiArrowsDownUpBold size={22} />}
						onClick={() => openDropdown('popularity')}
					/>

					<Dropdown
						isOpen={activeDropdown === 'popularity'}
						onClose={closeDropdown}
					>
						<SortFilter sortedBy={sortedBy} handleSelect={handleSelect} />
					</Dropdown>
				</li>
				<li>
					<DynamicButton
						onClick={handleSubscribe}
						text="Подписки"
						isIconLeft
						svgIcon={<BsCheck2 size={24} />}
					/>
				</li>
			</ul>

			<PodcastList />
		</div>
	)
}

export default Podcasts
