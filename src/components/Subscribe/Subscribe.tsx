import { FC } from 'react'
import s from './Subscribe.module.scss'
import toast, { Toaster } from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'

export const Subscribe: FC = () => {
	return (
		<>
			<Toaster position="top-right">
				{t => (
					<div
						style={{
							opacity: t.visible ? 1 : 0,
							background: 'var(--neutrals-800)',
							color: '#e8e8e8',
							borderRadius: 'var(--border-radius-2)',
							fontSize: 'var(--fontSize-3)',
							width: '40rem',
							padding: '2rem 7rem 2rem 3.3rem',
							lineHeight: '24px',
							position: 'fixed',
							top: '12px',
							right: '12px',
							boxShadow: '5px 5px 10px 0 rgba(0, 0, 0, .3)',
						}}
					>
						<a className={s.accentColor} href="#">
							Войдите
						</a>{' '}
						или{' '}
						<a className={s.accentColor} href="#">
							зарегистрируйтесь
						</a>
						, чтобы использовать «Избранное» и «Подписки»
						<button
							className={s.btn}
							type="button"
							onClick={() => toast.dismiss(t.id)}
						>
							<IoClose size={22} />
						</button>
					</div>
				)}
			</Toaster>
		</>
	)
}
