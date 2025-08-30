import { FC } from 'react'
import { SortOptionGenresState } from '../../../store/slices/genresFilterSlice'
import { useStore } from '../../../store/store'
import s from './GenresFilter.module.scss'

type GenresFilterProps = {
	handleSelectGenres: (option: SortOptionGenresState) => void
}

const GenresFilter: FC<GenresFilterProps> = ({ handleSelectGenres }) => {
	const { tags, genres, changesSortingByGenre } = useStore()

	const clickHandler = (option: SortOptionGenresState) => {
		handleSelectGenres(option)
		changesSortingByGenre(option)
	}

	return (
		<div className={s.wrapper}>
			<div className={s.inner}>
				<span className={s.title}>По стилям</span>
				<div>
					<ul className={s.list}>
						{genres.map(genre => (
							<li className={s.item} key={genre.id}>
								<button
									className={`${s.btn} ${s.btnStyles}`}
									type='button'
									onClick={() =>
										clickHandler({
											id: genre.name,
											name:
												genre.name
													.charAt(0)
													.toUpperCase() +
												genre.name
													.slice(1)
													.toLowerCase(),
											style: 'genre',
										})
									}
								>
									{genre.name}
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
						{tags.map(tag => (
							<li className={s.item} key={tag.id}>
								<button
									className={`${s.btn} ${s.btnTopic}`}
									type='button'
									onClick={() =>
										clickHandler({
											id: tag.name,
											name:
												tag.name
													.charAt(0)
													.toUpperCase() +
												tag.name.slice(1).toLowerCase(),
											style: 'tags',
										})
									}
								>
									<div
										dangerouslySetInnerHTML={{
											__html: tag.svg,
										}}
									/>
									<span>{tag.name}</span>
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
