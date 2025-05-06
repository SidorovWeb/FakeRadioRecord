import { Genre, Station, Tag } from './api'

export type DataStore = {
	stations: Station[]
	tags: Tag[]
	genre: Genre[]
	sortedNewestStation: Station[]
	sortedAlphabetStation: Station[]
	loading: boolean
	error: string | null
	fetchData: () => Promise<void>
}
