import { Genre, Station, Tag } from './api'

export type DataStore = {
	stations: Station[]
	tags: Tag[]
	genre: Genre[]
	loading: boolean
	error: string | null
	fetchData: () => Promise<void>
}
