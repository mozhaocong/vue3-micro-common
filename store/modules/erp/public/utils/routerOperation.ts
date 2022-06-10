import { getUrlPathSearch } from '@/utils'
import { ISWEbHASHHISTORY } from '@/microAppMethod'

//// 登录失效重新登录
export function loginAgain() {
	localStorage.removeItem('Authorization')
	sessionStorage.removeItem('Authorization')
	const whiteList = ['/login']
	const { pathSearch, path } = getUrlPathSearch()
	if (whiteList.includes(path)) return
	let baseUrl = ['./', '/'].includes(import.meta.env.BASE_URL) ? '/' : import.meta.env.BASE_URL
	baseUrl = ISWEbHASHHISTORY ? baseUrl + '#/' : baseUrl
	window.location.replace(window.location.origin + baseUrl + 'login?replace=' + encodeURIComponent(pathSearch))
	// 路由hash模式replace有问题
	if (ISWEbHASHHISTORY) {
		window.location.reload()
	}
}
