import { FC, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import Dropdown from '../Dropdown/Dropdown'
import GenresFilter from './GenresFilter/GenresFilter'
import LayoutFilter from './LayoutFilter/LayoutFilter'
import s from './QuickFilters.module.scss'
import SortFilter from './SortFilter/SortFilter'

export type SortOptionState = 'popular' | 'alphabet' | 'newest'

const QuickFilters: FC = () => {
	const [selectedOption, setSelectedOption] =
		useState<SortOptionState>('popular')
	const [isOpenDropdown, setIsOpenDropdown] = useState(false)
	const [activeDropdown, setActiveDropdown] = useState<
		'popularity' | 'genres' | null
	>(null)
	const options: { id: SortOptionState; label: string }[] = [
		{ id: 'popular', label: 'По популярности' },
		{ id: 'alphabet', label: 'По алфавиту' },
		{ id: 'newest', label: 'По новизне' },
	]

	// Универсальная функция переключения
	const toggleDropdown = (type: 'popularity' | 'genres') => {
		// Если кликаем по уже открытому дропдауну
		if (activeDropdown === type && isOpenDropdown) {
			closeDropdown()
			return
		}

		// Если другой дропдаун открыт - сначала закрываем его
		if (activeDropdown && activeDropdown !== type) {
			closeDropdown()
			// Ждем завершения анимации закрытия перед открытием нового
			setTimeout(() => {
				setActiveDropdown(type)
				setIsOpenDropdown(true)
			}, 300)
			return
		}

		setActiveDropdown(type)
		setIsOpenDropdown(true)
	}

	// Универсальная функция закрытия
	const closeDropdown = () => {
		setIsOpenDropdown(false)

		setTimeout(() => {
			setActiveDropdown(null)
		}, 300) // Для анимации закрытия
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
						onClick={() => toggleDropdown('genres')}
					>
						<span>Жанры</span>
						<IoIosArrowDown size={18} />
					</button>
					{activeDropdown === 'genres' && (
						<Dropdown
							isVisible={activeDropdown === 'genres'}
							isOpenDropdown={isOpenDropdown}
						>
							<GenresFilter />
						</Dropdown>
					)}
				</li>
				<li>
					<button
						className={`${s.popularity} ${s.btn}`}
						type='button'
						onClick={() => toggleDropdown('popularity')}
					>
						<span>
							{options.find(o => o.id === selectedOption)?.label}
						</span>
						<IoIosArrowDown size={18} />
					</button>
					{activeDropdown === 'popularity' && (
						<Dropdown
							isVisible={activeDropdown === 'popularity'}
							isOpenDropdown={isOpenDropdown}
						>
							<SortFilter
								options={options}
								selectedOption={selectedOption}
								handleSelect={handleSelect}
							/>
						</Dropdown>
					)}
				</li>
			</ul>
			<LayoutFilter />
		</div>
	)
}

export default QuickFilters
