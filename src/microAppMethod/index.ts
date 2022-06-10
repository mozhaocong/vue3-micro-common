import microApp from '@micro-zoe/micro-app'
import { isObject, isTrue, deepClone, getUrlPathSearch } from '@/utils'
import store from '@/store/index'
import vueRouter from '@/router'
import { microRouterMap } from '@/microAppMethod/util'

export const MICROWINDOWDATA: string = import.meta.env.VITE_APP_ID + `windowData`
// 是否微前端子应用
// @ts-ignore
export let ISMICROCHILD = false
// @ts-ignore
if (window.__MICRO_APP_BASE_APPLICATION__) {
	ISMICROCHILD = true
} else {
	ISMICROCHILD = import.meta.env.VITE_MICRO_TYPE === 'ViteChild'
}

// 路由是否WebHashHistory vite微前端默认子应用是hash模式
export const ISWEbHASHHISTORY = ISMICROCHILD

// microAppInit传进来的mount方法
let pushMount: any = null
// 微前端初始话
export function microAppInit(item: any) {
	// // 微前端环境下，注册mount和unmount方法
	// @ts-ignore
	if (ISMICROCHILD) {
		// @ts-ignore
		const windowKey: any = 'micro-app-' + import.meta.env.VITE_APP_ID
		pushMount = item?.mount
		window[windowKey] = { mount: mount, unmount: item.unmount ?? unmount } as any
	} else {
		const data: ObjectMap = {}
		microRouterMap.map((item) => {
			if (item.type === 'vite') {
				data[item.appId] = [
					{
						loader(code: any) {
							if (process.env.NODE_ENV === 'development') {
								// 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
								let { baseUrl } = item
								baseUrl = baseUrl.replace(/\//g, '\\/')
								const reg = new RegExp(`(from|import)(\\s*['"])(${baseUrl})`, 'g')
								code = code.replace(reg, (all: any) => {
									return all.replace(item.baseUrl, item.appUrl)
								})
							}
							return code
						},
					},
				]
			}
		})
		// 非微前端环境直接渲染
		microApp.start({
			plugins: {
				modules: {
					...data,
				},
			},
		})
		// 基座添加全局监听  基座的监听事件
		// eslint-disable-next-line no-inner-declarations
		function dataListener(item: any) {
			const { data = [] } = item
			data.forEach((res: any) => {
				const { type } = res
				switch (type) {
					case 'setRouterTagList':
						store.commit('erpLayout/SETROUTERTAGLIST', res.data || {})
						return
					case 'microTagRouterClick':
						microTagRouterClick(deepClone(res.data))
						return
					case 'setMainRouter':
						// eslint-disable-next-line no-case-declarations
						const { method = 'push' } = res?.data || {}
						// @ts-ignore
						vueRouter[method as any](res?.data.data)
						return
				}
			})
		}
		microApp.addGlobalDataListener(dataListener)
	}
}

export const eventCenterForAppNameKey = `eventCenterForAppName${import.meta.env.VITE_APP_ID}`

// 微前端子应用加载完后调用的方法
function mount() {
	if (window[MICROWINDOWDATA as any]) {
		console.log('有重复的 VITE_APP_ID', MICROWINDOWDATA)
		return
	}
	if (isTrue(pushMount)) {
		pushMount()
	}
	// 与基座进行数据交互
	function handleMicroData(router?: any) {
		// eventCenterForAppNameKey 是基座添加到window的数据通信对象
		// @ts-ignore
		const windowKey: any = eventCenterForAppNameKey
		if (window[windowKey]) {
			// 主动获取基座下发的数据
			// @ts-ignore
			const data = window[windowKey].getData()
			if (isObject(data)) {
				for (const dataKey in data) {
					if (dataKey === 'basePath') {
						if (window[MICROWINDOWDATA as any]) {
							console.log('有重复的 VITE_APP_ID', MICROWINDOWDATA)
							return
						} else {
							window[MICROWINDOWDATA as any] = { basePath: data[dataKey] } as any
						}
					}
				}
			}

			// 监听基座下发的数据变化
			// @ts-ignore
			window[windowKey].addDataListener((item: any) => {
				// console.log('child-vite addDataListener:', data)
				// if (data.path && typeof data.path === 'string') {
				// 	data.path = data.path.replace(/^#/, '')
				// 	// 当基座下发path时进行跳转
				// 	if (data.path && data.path !== router.currentRoute.value.path) {
				// 		router.push(data.path as string)
				// 	}
				// }
				const { pathSearch } = getUrlPathSearch()
				vueRouter.replace(pathSearch)
				const { data = [] } = item || {}
				data.forEach((res: any) => {
					switch (res.type) {
						case 'resetRouterTagList':
							store.commit('erpLayout/RESETROUTERTAGLIST', res.data || [])
							return
					}
				})
				console.log('addDataListener', data)
			})
		}
	}
	handleMicroData()
}

// 将卸载操作放入 unmount 函数
function unmount() {
	// app?.unmount()
	// history?.destroy()
	// // 卸载所有数据监听函数
	// window.eventCenterForAppNameVite?.clearDataListener()
	// app = null
	// router = null
	// history = null
	// console.log('微应用child-vite卸载了')
}

export function microTagRouterClick(data: any) {
	if (import.meta.env.VITE_APP_ID === data.microId) {
		vueRouter.push(data.path)
	} else if (import.meta.env.VITE_MICRO_TYPE === 'ViteMain') {
		const filter = microRouterMap.filter((item) => item.appId === data.microId)
		if (isTrue(filter)) {
			let filterData = filter[0].router.children[0].path
			filterData = filterData.replace(':page*', '#')
			const pushRouter = filterData + data.path
			vueRouter.push(pushRouter)
		} else {
			console.log('tagList 找不到对应的路由')
		}
	} else if (import.meta.env.VITE_MICRO_TYPE === 'ViteChild') {
		// @ts-ignore
		if (window[eventCenterForAppNameKey]) {
			// @ts-ignore
			window[eventCenterForAppNameKey].setGlobalData({ data: [{ type: 'microTagRouterClick', data: deepClone(data) }] })
		}
	}
}

// 点击侧边栏的导航，设置micro的路由标签
// 子应用通过全局通信通知基座更新路由标签，
// 基座通过对应路由的组件更新子应用的

export function microSetRouterTag(item: any) {
	if (import.meta.env.VITE_MICRO_TYPE === 'ViteChild') {
		// @ts-ignore
		if (window[eventCenterForAppNameKey]) {
			// @ts-ignore
			window[eventCenterForAppNameKey].setGlobalData({ data: [{ type: 'setRouterTagList', data: deepClone(item) }] })
		}
	}
}

export function microEmptyRouterTag() {
	if (import.meta.env.VITE_MICRO_TYPE === 'ViteChild') {
		// @ts-ignore
		if (window[eventCenterForAppNameKey]) {
			// @ts-ignore
			window[eventCenterForAppNameKey].setGlobalData({
				data: [{ type: 'setMainRouter', data: { method: 'push', data: '/' } }],
			})
		}
	} else if (import.meta.env.VITE_MICRO_TYPE === 'ViteMain') {
		vueRouter.push('/')
	}
}
