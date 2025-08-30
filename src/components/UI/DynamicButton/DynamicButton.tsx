import cn from 'classnames'
import { FC, ReactElement } from 'react'
import s from './DynamicButton.module.scss'

interface DynamicButtonProps {
	text?: string
	onClick?: () => void
	isIconLeft?: boolean
	svgIcon?: ReactElement | null
	style?: React.CSSProperties
	white?: boolean
}

const DynamicButton: FC<DynamicButtonProps> = ({
	text,
	onClick,
	isIconLeft,
	svgIcon,
	style,
	white,
}) => {
	return (
		<button
			className={cn(s.btn, { [s.btnWhite]: white })}
			style={style}
			type='button'
			onClick={onClick}
		>
			{isIconLeft && <div className={s.iconLeft}>{svgIcon}</div>}

			{text && <span>{text}</span>}
			{!isIconLeft && svgIcon}
		</button>
	)
}

export default DynamicButton
