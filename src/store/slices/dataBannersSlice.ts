import { StateCreator } from 'zustand'
import { fetchWithProxyRetry } from '../../services/fetchWithProxyRetry'
import { DataBanners } from '../../types/ store'
import { Banners } from '../../types/api'

export const createDataBannersSlice: StateCreator<DataBanners> = set => ({
	banners: [],
	bannersLoading: false,
	bannersError: null,

	fetchDataBanners: async () => {
		set({ bannersLoading: true, bannersError: null })

		try {
			const data: Banners = await fetchWithProxyRetry('banners')

			set({ banners: data.result, bannersLoading: false })
		} catch (error) {
			set({ bannersError: 'Failed to fetch banners data', bannersLoading: false })
		}
	},
})
