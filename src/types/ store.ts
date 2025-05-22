import { BannersResult, Genre, Station, Tag } from './api'

export type DataStore = {
	stations: Station[]
	tags: Tag[]
	genres: Genre[]
	// sortedNewestStation: Station[]
	// sortedAlphabetStation: Station[]
	loading: boolean
	error: string | null
	changesStationsData: (stations: Station[]) => void
	fetchData: () => Promise<void>
}

export type DataBanners = {
	banners: BannersResult[]
	loading: boolean
	error: string | null
	fetchDataBanners: () => Promise<void>
}
