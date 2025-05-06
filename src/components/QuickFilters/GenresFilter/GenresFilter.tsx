import { FC } from 'react'
import { useStore } from '../../../store/store'
import s from './GenresFilter.module.scss'

const GenresFilter: FC = () => {
	const { tags, genre } = useStore()

	return (
		<div className={s.wrapper}>
			<div className={s.inner}>
				<span className={s.title}>По стилям</span>
				<div>
					<ul className={s.list}>
						{genre.map(g => (
							<li className={s.item} key={g.id}>
								<button
									className={`${s.btn} ${s.btnStyles}`}
									type='button'
								>
									{g.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className={s.inner}>
				<span className={s.title}>По темам</span>
				<div>
					<ul className={s.list}>
						{tags.map(t => (
							<li className={s.item} key={t.id}>
								<button
									className={`${s.btn} ${s.btnTopic}`}
									type='button'
								>
									<div
										dangerouslySetInnerHTML={{
											__html: t.svg,
										}}
									/>
									<span>{t.name}</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default GenresFilter
