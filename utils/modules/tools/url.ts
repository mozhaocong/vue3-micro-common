import { ISWEbHASHHISTORY, MICROWINDOWDATA } from '@/microAppMethod'
import { isTrue } from '@/utils'

export function getUrlPathSearch(): { path: string; pathSearch: string; search: string } {
	let path = location.pathname + location.hash
	// let baseUrl = import.meta.env.BASE_URL
	let baseUrl = import.meta.env.VITE_CONFIG_BASE
	let search = location.search

	// 京东微前端适配
	if (window[MICROWINDOWDATA as any]) {
		const { basePath } = (window[MICROWINDOWDATA as any] as any) || {}
		baseUrl = basePath ?? baseUrl
	}
	if (!['./', '/'].includes(baseUrl)) {
		path = '/' + path.replace(baseUrl, '')
	}
	if (ISWEbHASHHISTORY) {
		const pathSlice = path.slice(0, 2)
		if (pathSlice === '/#') {
			path = path.slice(2, path.length)
		}
		const pathSplit = path.split('?', 2)
		path = pathSplit[0]
		search = isTrue(pathSplit[1]) ? `?${pathSplit[1]}` : ''
	}

	return { pathSearch: path + search, path, search }
}

export function getSearchString(query = {}) {
	const res = new URLSearchParams(query)
	return res.toString()
}
