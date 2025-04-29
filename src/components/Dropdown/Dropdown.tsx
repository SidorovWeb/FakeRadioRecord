import cn from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import s from './Dropdown.module.scss'

type DropdownProps = {
	isVisible: boolean
	isOpenDropdown: boolean
	setIsVisible?: (value: boolean) => void
	parentRef?: React.RefObject<HTMLDivElement | null>
	children: React.ReactNode
	isPosition?: boolean
}

const Dropdown: FC<DropdownProps> = ({
	isVisible,
	isOpenDropdown,
	setIsVisible,
	parentRef,
	children,
	isPosition,
}) => {
	const [isMouseEntered, setIsMouseEntered] = useState<boolean>(false)
	const [isLeave, setIsLeave] = useState<boolean>(false)
	const parentElement = parentRef?.current
	const dropdown = useRef<HTMLDivElement>(null)
	const [isRight, setIsRight] = useState(false)

	useEffect(() => {
		const checkPosition = () => {
			if (parentElement) {
				const windowWidth = window.innerWidth
				const elementRect = parentElement.getBoundingClientRect()
				const elementRectWidth = elementRect.width
				const distanceToRightEdge = windowWidth - elementRect.right
				const halfScreenWidth = windowWidth / 2

				setIsRight(
					distanceToRightEdge + elementRectWidth < halfScreenWidth
				)
			}
		}

		checkPosition()
		window.addEventListener('resize', checkPosition)

		return () => window.removeEventListener('resize', checkPosition)
	}, [])

	useEffect(() => {
		if (!isOpenDropdown) {
			onLeave()
		}
	}, [isOpenDropdown])

	useEffect(() => {
		if (!parentElement) return

		const onParentMouseLeave = () => {
			onLeave()
		}

		parentElement.addEventListener('mouseleave', onParentMouseLeave)

		return () => {
			parentElement.removeEventListener('mouseleave', onParentMouseLeave)
		}
	}, [parentRef, setIsVisible])

	useEffect(() => {
		document.addEventListener('mousedown', clickHandler)

		return () => {
			document.removeEventListener('mousedown', clickHandler)
		}
	}, [isVisible])

	const clickHandler = (event: MouseEvent) => {
		if (
			isVisible &&
			dropdown.current &&
			!dropdown.current.contains(event.target as Node)
		) {
			dropdown.current.classList.remove(`${s.active}`)
			dropdown.current.classList.add(`${s.noActive}`)

			onLeave()
		}
	}

	const handleMouseEnter = () => {
		setIsMouseEntered(true)
	}

	const onLeave = () => {
		setIsLeave(true)

		setTimeout(() => {
			setIsMouseEntered(false)
			if (setIsVisible) setIsVisible(false)
		}, 300)
	}

	const handleMouseLeave = () => {
		if (parentElement && isMouseEntered) {
			onLeave()
		}
	}

	return (
		<div
			className={cn(
				s.wrapper,
				{ [s.isActive]: isVisible },
				{ [s.noActive]: isLeave },
				{ [s.left]: isPosition && !isRight },
				{ [s.right]: isPosition && isRight }
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={dropdown}
		>
			{children}
		</div>
	)
}

export default Dropdown
