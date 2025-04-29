import { FC, useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { RiSearchLine } from 'react-icons/ri'
import s from './Search.module.scss'

const Search: FC = () => {
	const [isClose, setIsClose] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (inputRef) {
			inputRef.current?.focus()
		}

		document.addEventListener('mousedown', clickHandler)

		return () => {
			document.removeEventListener('mousedown', clickHandler)
		}
	}, [isClose])

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

	const clickHandler = (event: MouseEvent) => {
		if (
			isClose &&
			wrapperRef.current &&
			!wrapperRef.current.contains(event.target as Node)
		) {
			wrapperRef.current.classList.remove(`${s.active}`)
			wrapperRef.current.classList.add(`${s.noActive}`)

			setTimeout(() => {
				setIsClose(!isClose)
			}, 200)
		}
	}

	return (
		<>
			{!isClose && (
				<button
					className={s.bntSearch}
					type='button'
					onClick={() => setIsClose(!isClose)}
				>
					<RiSearchLine size={24} />
				</button>
			)}

			{isClose && (
				<div
					className={`${s.formWrapper} ${isClose ? s.active : ''}`}
					ref={wrapperRef}
				>
					<form className={s.form} onSubmit={submitHandler}>
						<div className={s.search}>
							<RiSearchLine className={s.icon} size={24} />
							<input
								className={s.input}
								type='text'
								placeholder='Станции, Подкасты, события'
								autoComplete='on'
								ref={inputRef}
							/>
						</div>
					</form>
					<button
						className={s.closeSearch}
						type='button'
						onClick={() => setIsClose(!isClose)}
					>
						<IoClose size={24} />
					</button>
				</div>
			)}
		</>
	)
}

export default Search
