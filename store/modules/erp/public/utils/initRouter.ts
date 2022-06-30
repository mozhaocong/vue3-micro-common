import { getUrlPathSearch, isTrue, setArrayData } from '@/utils'
import store from '@/store'
import router from '@/router'
import { clone, has } from 'ramda'
import { ISMICROCHILD } from '@/microAppMethod'
import { microModelMap, microRouterMap } from '@/microAppMethod/util'

const whiteList = ['/login']

export default async function (res: ObjectMap) {
	const { path, search, pathSearch } = getUrlPathSearch()
	if (!isTrue(res)) {
		if (whiteList.includes(path)) {
			return
		}
		const replace = encodeURIComponent(pathSearch)
		router.replace({ path: '/login', query: { replace } })
		return
	}
	console.time('路由解析时间')
	setCurrencyRouter()
	await setVueRouteEager()
	console.timeEnd('路由解析时间')
	if (whiteList.includes(path)) {
		if (isTrue(search)) {
			const data = Object.fromEntries(new URLSearchParams(search)) || {}
			router.replace(decodeURIComponent(data.replace) ?? '/')
		} else {
			router.replace('/')
		}
	} else {
		router.replace(pathSearch)
	}
}

function setCurrencyRouter() {
	const list = [
		{
			path: '/:pathMatch(.*)',
			//访问主页的时候 重定向到index页面
			redirect: '/404',
		},
		{
			path: '/404',
			name: '/404',
			component: () => import('@/views/404'),
		},
	]
	list.forEach((item) => {
		router.addRoute(item)
	})
}

// 设置前端公共模块动态路由 import.meta.globEager 导入模式 就是git子模块的路由
async function setVueRouteEager() {
	let publicRouter = []
	// 获取公共路由去src目录找文件 子模块不需要加载公共模块路由
	if (import.meta.env.VITE_MICRO_TYPE === 'ViteMain' && import.meta.env.VITE_ENV === 'test') {
		publicRouter = await getGlobEagerRouter('public')
	}
	// 获取当前项目的路由去child目录找文件
	const childRouter = await getGlobEagerRouter('child')

	// const routerDataTest = setRouterFilterData()
	// setVueRouterFilter(routerDataTest)

	let layoutHeaderList: any = [...publicRouter, ...childRouter]

	if (import.meta.env.VITE_MICRO_TYPE === 'ViteMain' && import.meta.env.VITE_ADD_MICRO != 'false') {
		const microHeaderList = setMicroRouter()
		layoutHeaderList = [...layoutHeaderList, ...microHeaderList]
	}

	// 要设置layoutRouterData数据，侧边栏是使用layoutRouterData来过滤出数据来的
	store.commit('erpLayout/SetLayoutRouterDate', layoutHeaderList)
	// 是子应用不需要header和加载微前端路由和微前端模块
	if (ISMICROCHILD || import.meta.env.VITE_ADD_MICRO == 'false') return
	const dataMicroModel = setMicroModel()
	store.commit('erpLayout/SetMicroModeList', dataMicroModel)
}

// 通过搜索文件,找到对应的路由文件,读取配置的路由信息
async function getGlobEagerRouter(path = 'public') {
	try {
		let filesEager: any = {}
		switch (path) {
			case 'public':
				filesEager = await import.meta.globEager('../../../../../router/modules/index.ts')
				break
			case 'child':
				filesEager = await import.meta.globEager('../../../../../../child/router/modules/index.ts')
				break
			default:
				console.error('getGlobEagerRouter: 找不到对应的路径')
				return []
		}
		let routerData: any[] = []
		for (const key in filesEager) {
			const item = filesEager[key]
			item.default.forEach((res: any) => {
				let pushData: any = {}
				res.router.forEach((routerItem: any) => {
					// 修改vueRouter参数提供layout的组件的字段
					pushData = filesRouter(routerItem, res.pathName)
					// 过滤路由
					// const dataTest = setArrayFilter([clone(pushData)], (item) => {
					// 	return !isTrue(item.microAppPath)
					// })
					routerData = setRouterTree(routerData, pushData, res.pathName)
					router.addRoute(pushData)
				})
			})
		}
		return routerData
	} catch (err) {
		console.error('getGlobEagerRouter', err)
		return []
	}
}

// 京东微前端添加路由
function setMicroRouter() {
	const data: any[] = []
	// 是微前端子应用不需要加子应用路由
	if (ISMICROCHILD) {
		return data
	}
	microRouterMap.forEach((item: any) => {
		if (!isTrue(item.router)) {
			return
		}
		if (!item?.router?.meta) {
			item.router.meta = {} as any
		}
		item.router.meta.isMicro = true
		router.addRoute(item.router)
		data.push({ ...item.router, pathName: item.router.name })
	})
	return data
}

// 京东微前端添加模块
function setMicroModel() {
	const data: any[] = []
	microModelMap.forEach((item) => {
		if (!isTrue(item.router)) {
			return
		}
		if (!item?.router?.meta) {
			item.router.meta = {} as any
		}
		item.router.meta.isMicro = true
		item.router.meta.isMicroModel = true
		router.addRoute(item.router as any)
		data.push({ ...item.router, title: item?.router?.meta?.title })
	})
	return data
}

function setRouterTree(data: any[], pushData: ObjectMap, pathName: string) {
	data = clone(data)
	const filterData = data.filter((item) => {
		return item.pathName === pathName
	})
	if (isTrue(filterData)) {
		filterData[0].children.push(pushData)
	} else {
		data.push({ path: pathName, pathName, name: pathName, title: pathName, children: [pushData] })
	}
	return data
}

const routerFilter: any[] = [
	{
		pathName: 'test',
		children: [
			{
				path: '/test',
				name: 'test',
				children: [
					{
						path: '/test/children1',
						name: 'testChildren1',
						children: [
							{
								path: '/test/children1/data1',
								name: 'testChildren1Data1',
							},
						],
					},
				],
			},
		],
	},
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setRouterFilterData() {
	function setResArrayData(res: ObjectMap, objData: ObjectMap) {
		if (isTrue(res) && has(res.name, objData)) {
			const setData: any = objData[res.name] || {}
			const returnData: ObjectMap = {
				path: setData.path,
				name: setData.name,
				meta: setData.meta,
				component: setData.component,
			}
			if (!isTrue(res.children)) {
				return returnData
			} else {
				returnData.children = []
				res.children.forEach((res: any) => {
					const forData = setResArrayData(res, objData)
					if (isTrue(forData)) {
						returnData.children.push(forData)
					}
				})
				return returnData
			}
		} else {
			return {}
		}
	}
	const returnData: any[] = []
	routerFilter.forEach((res) => {
		if (!has(res.pathName, dataRouterObject)) return
		const resChildrenData: any = {}
		res.children.forEach((resItem: any) => {
			const data = setResArrayData(resItem, dataRouterObject[res.pathName] as any)
			if (isTrue(data)) {
				if (!isTrue(resChildrenData.children)) {
					resChildrenData.children = []
				}
				resChildrenData.children.push(data)
			}
		})
		if (isTrue(resChildrenData)) {
			returnData.push({ pathName: res.pathName, children: resChildrenData.children })
		}
	})
	return returnData
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setVueRouterFilter(data: any[]) {
	function setPushRouter(item: ObjectMap, pushData: any[]) {
		let returnData: any = {}
		if (isTrue(item.component)) {
			returnData = {
				path: item.path,
				name: item.name,
				meta: item.meta,
				component: item.component,
			}
			// 方便理解
			// pushData.push(returnData)
		}
		if (isTrue(item.children)) {
			item.children.forEach((res: any) => {
				if (isTrue(returnData)) {
					returnData.children = []
					setPushRouter(res, returnData.children)
				} else {
					setPushRouter(res, pushData)
				}
			})
		}
		if (isTrue(returnData)) {
			pushData.push(returnData)
		}
	}
	data.forEach((item) => {
		item.children.forEach((res: any) => {
			const data = clone(res)
			const pushData: any[] = []
			setPushRouter(data, pushData)
		})
	})
}

const dataRouterObject: any = {}

function filesRouter(data: ObjectMap, pathName: string) {
	// 普通tree数组过滤
	// function setArrayFilter(item: any[], call: (callItem: ObjectMap) => boolean) {
	// 	return item.filter((res: any) => {
	// 		if (isTrue(res.children)) {
	// 			res.children = setArrayFilter(res.children, call)
	// 		}
	// 		return call(res)
	// 	})
	// }
	//
	// const dataTest = setArrayFilter([clone(data)], (item) => {
	// 	return !isTrue(item.microAppPath)
	// })

	// eslint-disable-next-line no-useless-catch
	try {
		if (isTrue(pathName)) {
			return setArrayData([data], (item) => {
				// 区分微前端子应用
				// if (!ISMICROCHILD) {
				// 	if (isTrue(item.path)) {
				// 		item.path = `/${pathName}${item.path}`
				// 	}
				// 	if (isTrue(item.redirect)) {
				// 		item.redirect = `/${pathName}${item.redirect}`
				// 	}
				// }

				if (isTrue(item.microAppPath)) {
					item.path = item.microAppPath
				}
				if (!isTrue(item.meta)) {
					item.meta = {}
				}
				item.meta = { pathName, menuItemKey: item.path, ...item.meta }

				// if (!has(pathName, dataRouterObject)) {
				// 	dataRouterObject[pathName] = {}
				// }
				// dataRouterObject[pathName][item.name] = item
				item.title = item?.meta?.title
				return item
			})[0]
		}
		return data
	} catch (e) {
		throw e
	}
}
