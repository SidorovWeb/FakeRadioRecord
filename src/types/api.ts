export interface RadioStations {
	result: Result
}

export interface Result {
	tags: Tag[]
	genre: Genre[]
	stations: Station[]
}

export interface Tag {
	id: number
	name: string
	detail_picture: string
	picture: string
	svg: string
	pdf: string
}

export interface Genre {
	id: number
	name: string
	detail_picture: any
	picture: any
	svg: any
	pdf: any
}

export interface Station {
	id: number
	prefix: string
	title: string
	tooltip: string
	sort: number
	bg_color: any
	bg_image: string
	bg_image_mobile: string
	svg_outline: string
	svg_fill: string
	pdf_outline?: string
	pdf_fill?: string
	short_title: string
	icon_gray: string
	icon_fill_colored: string
	icon_fill_white: string
	new: boolean
	new_date: any
	stream_64: string
	stream_128: string
	stream_320: string
	stream_hls: string
	genre: stationGenre[]
	detail_page_url: string
	shareUrl: string
	mark?: string
	updated: string
}

export interface stationGenre {
	id: number
	name: string
	detail_picture?: string
	picture?: string
	svg?: string
	pdf?: string
}

export interface Banners {
	result: BannersResult[]
}

export interface BannersResult {
	link: string
	image: string
	text: string
	html: string
	showHtml: boolean
	button: BannersButton
}

export interface BannersButton {
	text?: string
	link?: string
}

export interface Podcasts {
	result: PodcastsResult[]
}

export interface PodcastsResult {
	id: number
	sort: number
	name: string
	cover_horizontal: string
	cover_vertical: string
	cover_horizontal_thumb: string
	cover_itunes: string
	rss: RSS
	talk_show: number
	rss_prefix: string
	apple_categories: string
	is_new: number
	description: string
	cover_bg: string
	shareUrl: string
}

export enum RSS {
	Да = 'Да',
}
