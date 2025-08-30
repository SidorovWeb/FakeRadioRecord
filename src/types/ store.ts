import { BannersResult, Genre, PodcastsResult, Station, Tag } from './api'

export type DataStore = {
	stations: Station[]
	tags: Tag[]
	genres: Genre[]
	stationsLoading: boolean
	stationsError: string | null
	changesStationsData: (stations: Station[]) => void
	fetchData: () => Promise<void>
}

export type DataBanners = {
	banners: BannersResult[]
	bannersLoading: boolean
	bannersError: string | null
	fetchDataBanners: () => Promise<void>
}

export type DataPodcasts = {
	podcasts: PodcastsResult[]
	podcastsLoading: boolean
	podcastsError: string | null
	fetchDataPodcasts: () => Promise<void>
}
