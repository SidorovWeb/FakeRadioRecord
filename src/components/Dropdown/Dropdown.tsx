import cn from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import s from './Dropdown.module.scss'

type DropdownProps = {
	isOpen: boolean
	setIsDropdownOpen?: (value: boolean) => void
	onClose?: () => void
	parentRef?: React.RefObject<HTMLDivElement | null>
	children: React.ReactNode
	alignRight?: boolean
	animationDuration?: number
}

const Dropdown: FC<DropdownProps> = ({
	isOpen = false,
	setIsDropdownOpen,
	onClose,
	parentRef,
	children,
	alignRight = false,
	animationDuration = 300,
}) => {
	const [isAnimating, setIsAnimating] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [isMouseEntered, setIsMouseEntered] = useState<boolean>(false)
	const parentElement = parentRef?.current
	const dropdownRef = useRef<HTMLDivElement>(null)
	const [isAlignRight, setIsAlignRight] = useState(false)

	useEffect(() => {
		const checkPosition = () => {
			if (parentElement) {
				const windowWidth = window.innerWidth
				const elementRect = parentElement.getBoundingClientRect()
				const elementRectWidth = elementRect.width
				const distanceToRightEdge = windowWidth - elementRect.right
				const halfScreenWidth = windowWidth / 2

				setIsAlignRight(
					alignRight &&
						distanceToRightEdge + elementRectWidth < halfScreenWidth
				)
			}
		}

		checkPosition()
		window.addEventListener('resize', checkPosition)

		return () => window.removeEventListener('resize', checkPosition)
	}, [])

	useEffect(() => {
		if (isOpen) {
			setIsDropdownOpen && setIsDropdownOpen(true)
			setIsVisible(true)
			setIsAnimating(true)
			dropdownRef.current?.classList.add(s.active)
			dropdownRef.current?.classList.remove(s.noActive)
		} else {
			setIsAnimating(true)
			dropdownRef.current?.classList.remove(s.active)
			dropdownRef.current?.classList.add(s.noActive)

			const timer = setTimeout(() => {
				setIsDropdownOpen && setIsDropdownOpen(false)
				setIsVisible(false)
				setIsAnimating(false)
			}, animationDuration)

			return () => clearTimeout(timer)
		}
	}, [isOpen, animationDuration])

	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			if (
				isOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!parentRef?.current?.contains(event.target as Node)
			) {
				onClose?.()
			}
		}

		document.addEventListener('click', clickHandler)

		return () => {
			document.removeEventListener('click', clickHandler)
		}
	}, [isOpen])

	useEffect(() => {
		if (!parentElement) return

		const handleMouseLeave = () => {
			if (isOpen) {
				onClose?.()
			}
		}

		parentElement.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			parentElement.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [parentRef, isOpen, onClose])

	const handleMouseEnter = () => {
		setIsMouseEntered(true)
	}

	const handleMouseLeave = () => {
		if (parentElement && isMouseEntered) {
			onClose?.()
		}
	}

	if (!isVisible && !isAnimating) return null

	return (
		<div
			ref={dropdownRef}
			className={cn(s.wrapper, s.active, {
				[s.left]: alignRight && !isAlignRight,
				[s.right]: alignRight && isAlignRight,
			})}
			style={{
				transition: `opacity ${animationDuration}ms ease, transform ${animationDuration}ms ease`,
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</div>
	)
}

export default Dropdown
