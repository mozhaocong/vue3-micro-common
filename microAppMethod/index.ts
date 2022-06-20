import microApp from '@micro-zoe/micro-app'
import { isObject, isTrue, deepClone, getUrlPathSearch } from '@/utils'
import vueRouter from '@/router'
import store from '@/store'
import { microRouterMap } from '@/microAppMethod/util'
import { Router } from 'vue-router'

export const MICROWINDOWDATA: string = import.meta.env.VITE_APP_ID + `windowData`
// 是否微前端子应用
// @ts-ignore
export const ISMICROCHILD = window?.__MICRO_APP_BASE_APPLICATION__
	? true
	: import.meta.env.VITE_MICRO_TYPE === 'ViteChild'

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
						store.commit('erpLayout/AddDeleteRouterTagList', res.data || {})
						return
					case 'microTagRouterClick':
						microTagRouterClick(deepClone(res.data), vueRouter)
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
	console.log('12616373')
	if (window[MICROWINDOWDATA as any]) {
		console.log('有重复的 VITE_APP_ID', MICROWINDOWDATA)
		return
	}
	if (isTrue(pushMount)) {
		pushMount()
	}
	// 与基座进行数据交互
	function handleMicroData() {
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
				const { pathSearch } = getUrlPathSearch()
				vueRouter.replace(pathSearch)
				const { data = [] } = item || {}
				data.forEach((res: any) => {
					switch (res.type) {
						case 'resetRouterTagList':
							store.commit('erpLayout/ResetRouterTagList', res.data || [])
							return
					}
				})
			})
		}
	}
	handleMicroData()

	fixBugForVueRouter4(vueRouter)
}

/**
 * 用于解决主应用和子应用都是vue-router4时相互冲突，导致点击浏览器返回按钮，路由错误的问题。
 * 相关issue：https://github.com/micro-zoe/micro-app/issues/155
 * 当前vue-router版本：4.0.12
 */
function fixBugForVueRouter4(router: Router) {
	// 判断主应用是main-vue3或main-vite，因为这这两个主应用是 vue-router4
	// if (window.location.href.includes('/main-vue3') || window.location.href.includes('/main-vite')) {

	const microRouteFilter = microRouterMap
		.filter((item) => item.appId === import.meta.env.VITE_APP_ID)
		.map((item) => {
			console.log(item?.router?.children?.[0].path)
			const router = item?.router?.children?.[0].path
			if (isTrue(router)) {
				return router.replace(':page*', '#')
			}
			return ''
		})
	if (!isTrue(microRouteFilter)) {
		console.warn('vite子应用路由配置有问题')
		return
	}
	const realBaseRoute = microRouteFilter[0]
	if (!isTrue(realBaseRoute)) {
		console.warn('vite子应用路由配置有问题')
		return
	}
	console.log('realBaseRoute', realBaseRoute)
	/**
	 * 重要说明：
	 * 1、这里主应用下发的基础路由为：`/main-xxx/app-vite`，其中 `/main-xxx` 是主应用的基础路由，需要去掉，我们只取`/app-vite`，不同项目根据实际情况调整
	 *
	 * 2、因为vite关闭了沙箱，又是hash路由，我们这里写死realBaseRoute为：/app-vite#
	 */

	router.beforeEach(() => {
		if (typeof window.history.state?.current === 'string') {
			window.history.state.current = window.history.state.current.replace(new RegExp(realBaseRoute, 'g'), '')
		}
	})

	router.afterEach(() => {
		if (typeof window.history.state === 'object') {
			window.history.state.current = realBaseRoute + (window.history.state.current || '')
		}
	})
	// }
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

export function microTagRouterClick(data: any, router: any) {
	if (import.meta.env.VITE_APP_ID === data.microId) {
		router.push(data.path)
	} else if (import.meta.env.VITE_MICRO_TYPE === 'ViteMain') {
		const filter = microRouterMap.filter((item) => item.appId === data.microId)
		if (isTrue(filter)) {
			let filterData = filter[0].router.children[0].path
			filterData = filterData.replace(':page*', '#')
			const pushRouter = filterData + data.path
			router.push(pushRouter)
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
