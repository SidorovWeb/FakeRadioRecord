import { FC } from 'react'
import { RiVipCrownLine } from 'react-icons/ri'
import s from './UpgradePremium.module.scss'

const UpgradePremium: FC = () => {
	return (
		<button className={s.upgradePremium} type='button'>
			<RiVipCrownLine size={16} />
			<span>Перейти на Премиум</span>
		</button>
	)
}

export default UpgradePremium
