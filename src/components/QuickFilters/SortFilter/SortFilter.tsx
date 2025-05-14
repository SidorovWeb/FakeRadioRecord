import { FC } from 'react'
import { IoMdCheckmark } from 'react-icons/io'

import { SortedBy } from '../../../store/slices/sortSlice'
import { useStore } from '../../../store/store'
import s from './SortFilter.module.scss'

type SortFilterProps = {
	sortedBy: SortedBy
	handleSelect: (option: SortedBy) => void
}

const SortFilter: FC<SortFilterProps> = ({ sortedBy, handleSelect }) => {
	const options: SortedBy[] = [
		{ id: 'popular', name: 'По популярности' },
		{ id: 'alphabet', name: 'По алфавиту' },
		{ id: 'newest', name: 'По новизне' },
	]
	const { changesSorting } = useStore()

	const clickHandler = (option: SortedBy) => {
		handleSelect(option)
		changesSorting(option)
	}

	return (
		<ul className={s.list}>
			{options.map(option => (
				<li key={option.id}>
					<button
						className={s.btn}
						type='button'
						onClick={() => clickHandler(option)}
					>
						<span>{option.name}</span>
						{sortedBy.id === option.id && (
							<IoMdCheckmark size={24} />
						)}
					</button>
				</li>
			))}
		</ul>
	)
}

export default SortFilter
