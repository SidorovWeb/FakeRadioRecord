import { FC, useEffect, useMemo } from 'react'
import { useStore } from '../../../store/store'
import { PodcastsResult } from '../../../types/api'
import s from './PodcastList.module.scss'
import { PodcastCard } from '../PodcastCard/PodcastCard'
import { AnimatePresence } from 'framer-motion'

const PodcastsList: FC = () => {
	const {
		fetchDataPodcasts,
		podcasts,
		sortedBy,
		podcastsLoading,
		podcastsError,
	} = useStore()

	useEffect(() => {
		if (!podcasts.length) {
			fetchDataPodcasts()
		}
	}, [fetchDataPodcasts])

	const sortByPopular = (podcasts: PodcastsResult[]): PodcastsResult[] => {
		const result = [...podcasts]
		const firstElement = result.shift()
		if (firstElement) {
			return [firstElement, ...result.reverse()]
		}
		return result
	}

	const sortByNewest = (podcasts: PodcastsResult[]): PodcastsResult[] => {
		return [...podcasts].sort((a, b) => b.id - a.id)
	}

	const sortByAlphabet = (podcasts: PodcastsResult[]): PodcastsResult[] => {
		const latinWords: PodcastsResult[] = []
		const cyrillicWords: PodcastsResult[] = []
		const numbers: PodcastsResult[] = []

		podcasts.forEach(podcast => {
			const firstChar = podcast.name?.[0]
			if (!firstChar) {
				cyrillicWords.push(podcast)
				return
			}

			if (/^\d$/.test(firstChar)) {
				numbers.push(podcast)
			} else if (/^[a-zA-Z]$/.test(firstChar)) {
				latinWords.push(podcast)
			} else {
				cyrillicWords.push(podcast)
			}
		})

		const sortByName = (a: PodcastsResult, b: PodcastsResult) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase())

		numbers.sort(sortByName)
		latinWords.sort(sortByName)
		cyrillicWords.sort(sortByName)

		return [...numbers, ...latinWords, ...cyrillicWords]
	}

	const filteredPodcasts = useMemo(() => {
		if (!podcasts.length) return []

		switch (sortedBy.id) {
			case 'popular':
				return sortByPopular(podcasts)
			case 'newest':
				return sortByNewest(podcasts)
			case 'alphabet':
				return sortByAlphabet(podcasts)
			default:
				return [...podcasts]
		}
	}, [podcasts, sortedBy.id])

	if (podcastsLoading)
		return <div className={s.loading}>Loading podcasts...</div>
	if (podcastsError)
		return <div className={s.error}>Error: {podcastsError}</div>

	return (
		<div>
			<ul className={s.list}>
				<AnimatePresence>
					{filteredPodcasts.map(podcast => (
						<PodcastCard key={podcast.id} podcast={podcast} />
					))}
				</AnimatePresence>
			</ul>
		</div>
	)
}

export default PodcastsList
