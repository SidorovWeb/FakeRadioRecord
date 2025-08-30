import { PROXY_URL } from './config'

export async function fetchWithProxyRetry(apiEndpoint: string): Promise<any> {
	for (const [key, proxyUrl] of Object.entries(PROXY_URL)) {
		try {
			const fullUrl =
				proxyUrl + 'https://www.radiorecord.ru/api/' + apiEndpoint
			const response = await fetch(fullUrl)

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data: any = await response.json()
			return data // Возвращаем данные, если запрос прошел
		} catch (error: any) {
			console.error(`Ошибка с прокси ${key}:`, error.message)
			// Продолжаем пробовать следующий прокси
		}
	}

	// Если ни один прокси не сработал
	throw new Error('Все прокси не сработали')
}

// Использование
// fetchWithProxyRetry('banners')
// 	.then(data => console.log('Данные:', data))
// 	.catch(err => console.error('Ошибка:', err))
// const res: Banners = await fetchWithProxyRetry('banners')
