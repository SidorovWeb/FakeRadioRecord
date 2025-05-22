import { StateCreator } from 'zustand'
import { DataBanners } from '../../types/ store'
import { Banners } from '../../types/api'

export const createDataBannersSlice: StateCreator<DataBanners> = set => ({
	banners: [],
	loading: false,
	error: null,

	fetchDataBanners: async () => {
		set({ loading: true, error: null })

		try {
			const res = await fetch(
				'https://thingproxy.freeboard.io/fetch/https://www.radiorecord.ru/api/banners',
				{
					headers: {
						Accept: 'application/json',
					},
				}
			)

			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
			const data: Banners = await res.json()

			set({ banners: data.result, loading: false })
		} catch (error) {
			set({ error: 'Failed to fetch data banners', loading: false })
		}
	},
})
