import { StateCreator } from 'zustand'
import { fetchWithProxyRetry } from '../../services/fetchWithProxyRetry'
import { DataPodcasts } from '../../types/ store'
import { Podcasts } from '../../types/api'

export const createDataPodcastsSlice: StateCreator<DataPodcasts> = set => ({
	podcasts: [],
	podcastsLoading: false,
	podcastsError: null,

	fetchDataPodcasts: async () => {
		set({ podcastsLoading: true, podcastsError: null })

		try {
			const data: Podcasts = await fetchWithProxyRetry('podcasts')

			set({ podcasts: data.result, podcastsLoading: false })
		} catch (error) {
			set({
				podcastsError: 'Failed to fetch podcasts data',
				podcastsLoading: false,
			})
		}
	},
})
