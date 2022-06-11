export const microRouter = {
	crmVite: {
		path: '/childCrm',
		name: 'childCrmVite',
		redirect: '/childCrm/crmVite#/userManagement',
		meta: {
			title: 'crmVite',
			keepAlive: true,
			// 下面的属性只有微前端路由才有的
			isMicro: true,
			pathName: 'childCrmVite',
			appId: 'crmVite',
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childCrm/crmVite:page*',
				name: 'crmVite',
				component: () => import('@/microAppMethod/microApp/crmVite/index'),
				meta: {
					title: 'vite',
					keepAlive: true,
					isMicro: true,
				},
			},
		],
	},
	omsVite: {
		path: '/childOms',
		name: 'childOmsVite',
		redirect: '/childOms/omsVite#/omsTest',
		meta: {
			title: 'omsViteVite',
			keepAlive: true,
			// 下面的属性只有微前端路由才有的
			isMicro: true,
			pathName: 'childOmsVite',
			appId: 'omsVite',
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childOms/omsVite:page*',
				name: 'omsVite',
				component: () => import('@/microAppMethod/microApp/omsVite/index'),
				meta: {
					title: 'vite',
					keepAlive: true,
					isMicro: true,
				},
			},
		],
	},
	ccfVite: {
		path: '/childCcf',
		name: 'childCcfVite',
		redirect: '/childCcf/ccfVite#/cff',
		meta: {
			title: 'cffVite',
			keepAlive: true,
			// 下面的属性只有微前端路由才有的
			isMicro: true,
			pathName: 'childCcfVite',
			appId: 'cffVite',
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childCcf/ccfVite:page*',
				name: 'ccfVite',
				component: () => import('@/microAppMethod/microApp/ccfVite/index'),
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
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
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

// 给layout的content的路由添加缓存页面
export const microKeepAliveView = [
	'childCrmVite',
	'crmVite',
	'childOmsVite',
	'omsVite',
	'childErp',
	'erpVue2',
	'ccfVite',
]

// micro路由 保留基座的header，与基座有互相通信
export const microRouterMap: microRouterMapListType = [
	{
		type: 'vite',
		appId: 'omsVite',
		baseUrl: '/child/oms/',
<<<<<<< Updated upstream
		// appUrl: 'http://localhost:8910/child/oms/',
		appUrl: 'http://47.119.141.146:8080/child/oms/',
		router: microRouter.omsVite,
	},
	// {
	// 	type: 'vite',
	// 	appId: 'crmVite',
	// 	baseUrl: '/child/crm/',
	// 	appUrl: 'http://localhost:8911/child/crm/',
	// 	router: microRouter.crmVite,
	// },
=======
		appUrl: 'http://localhost:8914/child/oms/',
		router: microRouter.omsVite,
	},
	{
		type: 'vite',
		appId: 'crmVite',
		baseUrl: '/child/crm/',
		appUrl: 'http://localhost:8911/child/crm/',
		router: microRouter.crmVite,
	},
	{
		type: 'vite',
		appId: 'ccfVite',
		baseUrl: '/child/ccf/',
		appUrl: 'http://localhost:8913/child/cff/',
		router: microRouter.ccfVite,
	},
>>>>>>> Stashed changes
]

// micro模块 与基座没有通信，不保留基座的东西，这个个页面都是模块的
export const microModelMap: microRouterMapListType = [
	{
		type: 'vue2',
		appId: 'erpVue2',
		baseUrl: '/child/erp/',
		// appUrl: 'http://10.17.201.63:8002/child/vue3/',
		// appUrl: 'http://10.17.201.63:8081',
		// appUrl: 'http://10.17.201.63:8080/',
		appUrl: 'http://47.119.141.146:8080/child/erp/',
		baseRoute: '/childErp/erpVue2',
		router: microRouter.erpVue2,
	},
]
