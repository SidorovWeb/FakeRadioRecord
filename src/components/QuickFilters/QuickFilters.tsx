import { FC, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { SortOptionState } from '../../store/slices/sortSlice'
import Dropdown from '../Dropdown/Dropdown'
import GenresFilter from './GenresFilter/GenresFilter'
import LayoutFilter from './LayoutFilter/LayoutFilter'
import s from './QuickFilters.module.scss'
import SortFilter from './SortFilter/SortFilter'

const QuickFilters: FC = () => {
	const options: { id: SortOptionState; label: string }[] = [
		{ id: 'popular', label: 'По популярности' },
		{ id: 'alphabet', label: 'По алфавиту' },
		{ id: 'newest', label: 'По новизне' },
	]
	const [selectedOption, setSelectedOption] =
		useState<SortOptionState>('popular')
	const [activeDropdown, setActiveDropdown] = useState<
		'popularity' | 'genres' | null
	>(null)

	const closeDropdown = () => setActiveDropdown(null)
	const openDropdown = (type: 'popularity' | 'genres' | null) => {
		setActiveDropdown(type)
	}

	const handleSelect = (option: SortOptionState) => {
		setSelectedOption(option)
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
						className={`${s.genres} ${s.btn}`}
						type='button'
						onClick={() => openDropdown('genres')}
					>
						<span>Жанры</span>
						<IoIosArrowDown size={18} />
					</button>

					<Dropdown
						isOpen={activeDropdown === 'genres'}
						onClose={closeDropdown}
					>
						<GenresFilter />
					</Dropdown>
				</li>
				<li>
					<button
						className={`${s.popularity} ${s.btn}`}
						type='button'
						onClick={() => openDropdown('popularity')}
					>
						<span>
							{options.find(o => o.id === selectedOption)?.label}
						</span>
						<IoIosArrowDown size={18} />
					</button>

					<Dropdown
						isOpen={activeDropdown === 'popularity'}
						onClose={closeDropdown}
					>
						<SortFilter
							options={options}
							selectedOption={selectedOption}
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
