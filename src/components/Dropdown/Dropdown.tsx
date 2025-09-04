import cn from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import s from './Dropdown.module.scss'
import { usePositionCheck } from '../../hooks/usePositionCheck '

interface DropdownProps {
	isOpen: boolean
	setIsDropdownOpen?: (value: boolean) => void
	onClose?: () => void
	parentRef?: React.RefObject<HTMLDivElement | null>
	children: React.ReactNode
	alignRight?: boolean
	right?: boolean
	left?: boolean
	animationDuration?: number
}

const Dropdown: FC<DropdownProps> = ({
	isOpen = false,
	setIsDropdownOpen,
	onClose,
	parentRef,
	children,
	alignRight = false,
	right = false,
	left = false,
	animationDuration = 300,
}) => {
	const [isVisible, setIsVisible] = useState(isOpen)
	const [isMouseEntered, setIsMouseEntered] = useState<boolean>(false)
	const parentElement = parentRef?.current
	const dropdownRef = useRef<HTMLDivElement>(null)
	const { isAlignRight, checkPosition } = usePositionCheck(
		alignRight,
		parentRef
	)

	useEffect(() => {
		window.addEventListener('resize', checkPosition)

		if (isOpen) checkPosition()

		return () => window.removeEventListener('resize', checkPosition)
	}, [isOpen, parentElement, alignRight])

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true)
			checkPosition()
			dropdownRef.current?.classList.add(s.active)
			dropdownRef.current?.classList.remove(s.noActive)
		} else {
			dropdownRef.current?.classList.remove(s.active)
			dropdownRef.current?.classList.add(s.noActive)

			const timer = setTimeout(() => {
				setIsDropdownOpen?.(false)
				setIsVisible(false)
			}, animationDuration)

			return () => clearTimeout(timer)
		}
	}, [isOpen, animationDuration, setIsDropdownOpen])

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
		setIsDropdownOpen?.(true)
		setIsMouseEntered(true)
	}

	const handleMouseLeave = () => {
		if (parentElement && isMouseEntered) {
			onClose?.()
		}
	}

	if (!isVisible) return null

	return (
		<div
			ref={dropdownRef}
			className={cn(s.wrapper, s.active, {
				[s.alignLeft]: alignRight && !isAlignRight,
				[s.alignRight]: alignRight && isAlignRight,
				[s.right]: !alignRight && right,
				[s.left]: !alignRight && left,
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
