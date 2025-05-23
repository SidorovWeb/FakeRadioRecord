import cn from 'classnames'
import { FC, useState } from 'react'
import { LuLayoutGrid } from 'react-icons/lu'
import { useStore } from '../../../store/store'
import s from './LayoutFilter.module.scss'

const LayoutFilter: FC = () => {
	const [isGridLayout, setIsGridLayout] = useState<boolean>(true)
	const { changesLayout } = useStore()

	const clickHandler = (isGrid: boolean) => {
		setIsGridLayout(isGrid)
		changesLayout(isGrid)
	}

	return (
		<ul className={s.layout}>
			<li>
				<button
					className={cn(`${s.btnGrid} ${s.btn}`, {
						[s.activeLayout]: isGridLayout,
					})}
					type='button'
					onClick={() => clickHandler(true)}
				>
					<LuLayoutGrid size={24} />
				</button>
			</li>
			<li>
				<button
					className={cn(`${s.btnColumns} ${s.btn}`, {
						[s.activeLayout]: !isGridLayout,
					})}
					type='button'
					onClick={() => clickHandler(false)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						className='injected-svg'
						data-src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V6C22 7.10457 21.1046 8 20 8H4C2.89543 8 2 7.10457 2 6V4ZM4 4H20V6H4L4 4Z' fill='currentColor'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V13C22 14.1046 21.1046 15 20 15H4C2.89543 15 2 14.1046 2 13V11ZM4 11H20V13H4L4 11Z' fill='currentColor'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 16C2.89543 16 2 16.8954 2 18V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V18C22 16.8954 21.1046 16 20 16H4ZM20 18H4L4 20H20V18Z' fill='currentColor'/%3E %3C/svg%3E"
						xmlnsXlink='http://www.w3.org/1999/xlink'
					>
						{' '}
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V6C22 7.10457 21.1046 8 20 8H4C2.89543 8 2 7.10457 2 6V4ZM4 4H20V6H4L4 4Z'
							fill='currentColor'
						></path>{' '}
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M2 11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V13C22 14.1046 21.1046 15 20 15H4C2.89543 15 2 14.1046 2 13V11ZM4 11H20V13H4L4 11Z'
							fill='currentColor'
						></path>{' '}
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M4 16C2.89543 16 2 16.8954 2 18V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V18C22 16.8954 21.1046 16 20 16H4ZM20 18H4L4 20H20V18Z'
							fill='currentColor'
						></path>{' '}
					</svg>
				</button>
			</li>
		</ul>
	)
}

export default LayoutFilter
