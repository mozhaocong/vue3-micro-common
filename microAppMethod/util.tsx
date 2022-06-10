export const microRouter = {
	omsVite: {
		path: '/childOms',
		name: 'childOmsKeepAliveView',
		redirect: '/childOms/omsVite#/userManagement',
		meta: {
			title: '测试列表1',
			keepAlive: true,
			// 下面的属性只有微前端路由才有的
			isMicro: true,
			pathName: 'childOmsKeepAliveView',
			appId: 'omsVite',
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appname-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childOms/omsVite:page*',
				name: 'viteTest',
				component: () => import('@/microAppMethod/microApp/vite/index'),
				meta: {
					title: 'vite',
					keepAlive: true,
					isMicro: true,
				},
			},
		],
	},
	erpVue2: {
		path: '/childErp',
		name: 'childErp',
		redirect: '/childErp/erpVue2#/homeIndex',
		meta: {
			title: 'ERP',
			keepAlive: true,
			// 下面的属性只有微前端才有的(路由和模块都有)
			isMicro: true,
			pathName: 'childErp',
			appId: 'erpVue2',
			// 下面属性是只有微前端模块才有的
			isMicroModel: true,
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appname-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childErp/erpVue2:page*',
				name: 'erpVue2',
				component: () => import('@/microAppMethod/microApp/vue2/index'),
				meta: {
					title: 'erpVue2',
					keepAlive: true,
					isMicro: true,
					isMicroModel: true,
				},
			},
		],
	},
}

interface microRouterMapType {
	type: 'vite' | 'vue2'
	appId: string // micro name, 唯一值
	baseUrl: string // 部署地址 path
	appUrl: string // 项目地址 和 baseUrl有依赖性
	baseRoute?: string // micro baseroute 基座路由 ，除type == vite其他类型都要配置
	router: ObjectMap // 基座路由信息
}
type microRouterMapListType = Array<microRouterMapType>

// micro路由 保留基座的header，与基座有互相通信
export const microRouterMap: microRouterMapListType = [
	{
		type: 'vite',
		appId: 'omsVite',
		baseUrl: '/child/oms/',
		appUrl: 'http://localhost:8992/child/oms/',
		router: microRouter.omsVite,
	},
]

// micro模块 与基座没有通信，不保留基座的东西，这个个页面都是模块的
export const microModelMap: microRouterMapListType = [
	{
		type: 'vue2',
		appId: 'erpVue2',
		baseUrl: '/child/vue3/',
		// appUrl: 'http://10.17.201.63:8002/child/vue3/',
		// appUrl: 'http://10.17.201.63:8081',
		appUrl: 'http://10.17.201.63:8080/',
		baseRoute: '/childErp/erpVue2',
		router: microRouter.erpVue2,
	},
]
