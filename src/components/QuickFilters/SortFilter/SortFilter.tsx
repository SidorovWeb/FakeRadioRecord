import { FC } from 'react'
import { IoMdCheckmark } from 'react-icons/io'

import { SortOptionState } from '../../../store/slices/sortSlice'
import { useStore } from '../../../store/store'
import s from './SortFilter.module.scss'

type SortFilterProps = {
	options: { id: SortOptionState; label: string }[]
	selectedOption: SortOptionState
	handleSelect: (value: SortOptionState) => void
}

const SortFilter: FC<SortFilterProps> = ({
	options,
	selectedOption,
	handleSelect,
}) => {
	const { changesSorting } = useStore()

	const clickHandler = (option: SortOptionState) => {
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
						onClick={() => clickHandler(option.id)}
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
