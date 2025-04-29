import { FC } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { SortOption } from '../QuickFilters'
import s from './SortFilter.module.scss'

type SortFilterProps = {
	options: { id: SortOption; label: string }[]
	selectedOption: SortOption
	handleSelect: (value: SortOption) => void
}

const SortFilter: FC<SortFilterProps> = ({
	options,
	selectedOption,
	handleSelect,
}) => {
	return (
		<ul className={s.list}>
			{options.map(option => (
				<li key={option.id}>
					<button
						className={s.btn}
						type='button'
						onClick={() => handleSelect(option.id)}
					>
						<span>{option.label}</span>
						{selectedOption === option.id && (
							<IoMdCheckmark size={24} />
						)}
					</button>
				</li>
			))}
		</ul>
	)
}

export default SortFilter
