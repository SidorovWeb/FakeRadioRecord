import { RefObject, useCallback, useEffect, useState } from 'react'

interface UsePositionCheckReturn {
	isAlignRight: boolean
	checkPosition: () => void
}

export const usePositionCheck = (
	alignRight: boolean = false,
	parentRef: RefObject<HTMLElement | null> | undefined
): UsePositionCheckReturn => {
	const [isAlignRight, setIsAlignRight] = useState(false)

	const checkPosition = useCallback(() => {
		const parentElement = parentRef?.current

		if (parentElement) {
			const windowWidth = window.innerWidth
			const elementRect = parentElement.getBoundingClientRect()
			const elementRectWidth = elementRect.width
			const distanceToRightEdge = windowWidth - elementRect.right
			const halfScreenWidth = windowWidth / 2

			setIsAlignRight(
				alignRight && distanceToRightEdge + elementRectWidth < halfScreenWidth
			)
		}
	}, [parentRef, alignRight])

	useEffect(() => {
		window.addEventListener('resize', checkPosition)
		return () => window.removeEventListener('resize', checkPosition)
	}, [checkPosition])

	return {
		isAlignRight,
		checkPosition,
	}
}
