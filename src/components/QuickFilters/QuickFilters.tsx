import cn from 'classnames'
import { FC, MouseEvent, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { IoIosArrowDown, IoIosCloseCircle } from 'react-icons/io'
import { SortOptionGenresState } from '../../store/slices/genresFilterSlice'
import { SortedBy } from '../../store/slices/sortSlice'
import { useStore } from '../../store/store'
import Dropdown from '../Dropdown/Dropdown'
import GenresFilter from './GenresFilter/GenresFilter'
import LayoutFilter from './LayoutFilter/LayoutFilter'
import s from './QuickFilters.module.scss'
import SortFilter from './SortFilter/SortFilter'

const QuickFilters: FC = () => {
	const { changesSortingByGenre, changesSorting } = useStore()
	const [sortedBy, setSortedBy] = useState<SortedBy>({
		id: 'popular',
		name: 'По популярности',
	})

	const [sortedByGenres, setSortedByGenres] = useState<SortOptionGenresState>(
		{
			id: '',
			name: '',
			style: null,
		}
	)

	const [activeDropdown, setActiveDropdown] = useState<
		'popularity' | 'genres' | null
	>(null)

	const closeDropdown = () => setActiveDropdown(null)
	const openDropdown = (type: 'popularity' | 'genres' | null) => {
		setActiveDropdown(type)
	}

	const handleSelect = (option: SortedBy) => {
		setSortedBy(option)
		closeDropdown()
	}

	const handleSelectGenres = (option: SortOptionGenresState) => {
		setSortedByGenres(option)
		closeDropdown()
	}

	const resetFilters = (event: MouseEvent) => {
		event.stopPropagation()
		setSortedByGenres({ id: '', name: '', style: null })
		changesSortingByGenre({ id: '', name: '', style: null })
		changesSorting({ id: 'popular', name: 'По популярности' })
		setSortedBy({ id: 'popular', name: 'По популярности' })
		closeDropdown()
	}

	return (
		<div className={s.wrapper}>
			<ul className={s.list}>
				<li>
					<button className={`${s.btn} ${s.favorites}`} type='button'>
						<FaRegHeart size={20} />
						<span>Избранные</span>
					</button>
				</li>
				<li>
					<button
						className={cn(s.genres, s.btn, {
							[s.filterActive]: sortedByGenres.name,
						})}
						type='button'
						onClick={() => openDropdown('genres')}
					>
						<span>{sortedByGenres.name || 'Жанры'}</span>
						{!sortedByGenres.name && <IoIosArrowDown size={18} />}
						{sortedByGenres.name && (
							<IoIosCloseCircle
								size={24}
								onClick={resetFilters}
							/>
						)}
					</button>

					<Dropdown
						isOpen={activeDropdown === 'genres'}
						onClose={closeDropdown}
					>
						<GenresFilter handleSelectGenres={handleSelectGenres} />
					</Dropdown>
				</li>
				<li>
					<button
						className={`${s.popularity} ${s.btn}`}
						type='button'
						onClick={() => openDropdown('popularity')}
					>
						<span>{sortedBy.name}</span>
						<IoIosArrowDown size={18} />
					</button>

					<Dropdown
						isOpen={activeDropdown === 'popularity'}
						onClose={closeDropdown}
					>
						<SortFilter
							sortedBy={sortedBy}
							handleSelect={handleSelect}
						/>
					</Dropdown>
				</li>
			</ul>
			<LayoutFilter />
		</div>
	)
}

export default QuickFilters
