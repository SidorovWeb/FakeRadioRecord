// import { useCallback, useEffect, useState } from 'react'

// export interface RadioStations {
// 	result: Result
// }

// export interface Result {
// 	tags: Tag[]
// 	genre: Genre[]
// 	stations: Station[]
// }

// export interface Tag {
// 	id: number
// 	name: string
// 	detail_picture: string
// 	picture: string
// 	svg: string
// 	pdf: string
// }

// export interface Genre {
// 	id: number
// 	name: string
// 	detail_picture: any
// 	picture: any
// 	svg: any
// 	pdf: any
// }

// export interface Station {
// 	id: number
// 	prefix: string
// 	title: string
// 	tooltip: string
// 	sort: number
// 	bg_color: any
// 	bg_image: string
// 	bg_image_mobile: string
// 	svg_outline: string
// 	svg_fill: string
// 	pdf_outline?: string
// 	pdf_fill?: string
// 	short_title: string
// 	icon_gray: string
// 	icon_fill_colored: string
// 	icon_fill_white: string
// 	new: boolean
// 	new_date: any
// 	stream_64: string
// 	stream_128: string
// 	stream_320: string
// 	stream_hls: string
// 	genre: Genre2[]
// 	detail_page_url: string
// 	shareUrl: string
// 	mark?: string
// 	updated: string
// }

// export interface Genre2 {
// 	id: number
// 	name: string
// 	detail_picture?: string
// 	picture?: string
// 	svg?: string
// 	pdf?: string
// }

// export const useFetchStations = () => {
// 	const [stations, setStations] = useState<Station[]>([])
// 	const [loading, setLoading] = useState<boolean>(true)
// 	const [error, setError] = useState<string | null>(null)

// 	const fetchData = useCallback(async () => {
// 		try {
// 			const res = await fetch(
// 				'https://thingproxy.freeboard.io/fetch/https://www.radiorecord.ru/api/stations',
// 				{
// 					headers: {
// 						Accept: 'application/json',
// 					},
// 				}
// 			)

// 			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

// 			const data: RadioStations = await res.json()
// 			setStations(data.result.stations)
// 		} catch (err) {
// 			setError(err instanceof Error ? err.message : 'Unknown error')
// 		} finally {
// 			setLoading(false)
// 		}
// 	}, [])

// 	useEffect(() => {
// 		fetchData()
// 	}, [fetchData])

// 	return { stations, loading, error, refetch: fetchData }
// }
