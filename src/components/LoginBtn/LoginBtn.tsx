import { FC } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import s from './LoginBtn.module.scss'

const LoginBtn: FC = () => {
	return (
		<button className={s.LoginBtn} type='button'>
			<HiOutlineUserCircle size={24} />
			<span>Войти</span>
		</button>
	)
}

export default LoginBtn
