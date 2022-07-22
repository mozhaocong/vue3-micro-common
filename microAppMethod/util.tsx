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
	rmaVite: {
		path: '/childRma',
		name: 'childRmaVite',
		redirect: '/childRma/rmaVite#/rma',
		meta: {
			title: 'rmaVite',
			keepAlive: true,
			// 下面的属性只有微前端路由才有的
			isMicro: true,
			pathName: 'childRmaVite',
			appId: 'rmaVite',
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childRma/rmaVite:page*',
				name: 'rmaVite',
				component: () => import('@/microAppMethod/microApp/rmaVite/index'),
				meta: {
					title: 'vite',
					keepAlive: true,
					isMicro: true,
				},
			},
		],
	},
	wmsVite: {
		path: '/childWms',
		name: 'childWmsVite',
		redirect: '/childWms/wmsVite#/wms',
		meta: {
			title: 'wmsVite',
			keepAlive: true,
			// 下面的属性只有微前端路由才有的
			isMicro: true,
			pathName: 'childWmsVite',
			appId: 'wmsVite',
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childWms/wmsVite:page*',
				name: 'wmsVite',
				component: () => import('@/microAppMethod/microApp/wmsVite/index'),
				meta: {
					title: 'vite',
					keepAlive: true,
					isMicro: true,
				},
			},
		],
	},
	logsVite: {
		path: '/childLogs',
		name: 'childLogsVite',
		redirect: '/childLogs/logsVite#/logsTest',
		meta: {
			title: 'logsVite',
			keepAlive: true,
			// 下面的属性只有微前端路由才有的
			isMicro: true,
			pathName: 'childLogsVite',
			appId: 'logsVite',
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childLogs/logsVite:page*',
				name: 'logsVite',
				component: () => import('@/microAppMethod/microApp/logsVite/index'),
				meta: {
					title: 'vite',
					keepAlive: true,
					isMicro: true,
				},
			},
		],
	},
	productsVite: {
		path: '/childProducts',
		name: 'childProductsVite',
		redirect: '/childProducts/productsVite#/information',
		meta: {
			title: 'productsVite',
			keepAlive: true,
			// 下面的属性只有微前端路由才有的
			isMicro: true,
			pathName: 'childProductsVite',
			appId: 'productsVite',
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childProducts/productsVite:page*',
				name: 'productsVite',
				component: () => import('@/microAppMethod/microApp/products/index'),
				meta: {
					title: 'vite',
					keepAlive: true,
					isMicro: true,
				},
			},
		],
	},
	shippingVite: {
		path: '/childShipping',
		name: 'childShippingVite',
		redirect: '/childShipping/shippingVite#/shipping',
		meta: {
			title: 'shippingVite',
			keepAlive: true,
			// 下面的属性只有微前端路由才有的
			isMicro: true,
			pathName: 'childShippingVite',
			appId: 'shippingVite',
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childShipping/shippingVite:page*',
				name: 'shippingVite',
				component: () => import('@/microAppMethod/microApp/shipping/index'),
				meta: {
					title: 'vite',
					keepAlive: true,
					isMicro: true,
				},
			},
		],
	},
	baseVite: {
		path: '/childBase',
		name: 'childBaseVite',
		redirect: '/childBase/baseVite#/base',
		meta: {
			title: 'baseVite',
			keepAlive: true,
			// 下面的属性只有微前端路由才有的
			isMicro: true,
			pathName: 'childBaseVite',
			appId: 'baseVite',
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childBase/baseVite:page*',
				name: 'baseVite',
				component: () => import('@/microAppMethod/microApp/baseVite/index'),
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
				component: () => import('@/microAppMethod/microApp/erpVue2/index'),
				meta: {
					title: 'erpVue2',
					keepAlive: true,
					isMicro: true,
					isMicroModel: true,
				},
			},
		],
	},
	kibana: {
		path: '/childKibana',
		name: 'childKibana',
		redirect: '/childKibana/Kibana',
		meta: {
			title: 'kibana',
			keepAlive: true,
			// 下面的属性只有微前端才有的(路由和模块都有)
			isMicro: true,
			pathName: 'childKibana',
			appId: 'kibana',
			// 下面属性是只有微前端模块才有的
			isMicroModel: true,
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childKibana/Kibana',
				name: 'kibana',
				component: () => import('@/microAppMethod/microApp/kibana/index'),
				meta: {
					title: 'Kibana',
					keepAlive: true,
					isMicro: true,
					isMicroModel: true,
				},
			},
		],
	},
	general: {
		path: '/childGeneral',
		name: 'childGeneral',
		redirect: '/childKibana/General',
		meta: {
			title: 'General',
			keepAlive: true,
			// 下面的属性只有微前端才有的(路由和模块都有)
			isMicro: true,
			pathName: 'childGeneral',
			appId: 'General',
			// 下面属性是只有微前端模块才有的
			isMicroModel: true,
		},
		component: () => import('@/layout/index'),
		children: [
			{
				// 因为主应用为history路由，appName-vite子应用是hash路由，这里配置略微不同
				// 已解决带参数时页面丢失的问题
				path: '/childKibana/General',
				name: 'general',
				component: () => import('@/microAppMethod/microApp/general/index'),
				meta: {
					title: 'Grafana',
					keepAlive: true,
					isMicro: true,
					isMicroModel: true,
				},
			},
		],
	},
}

interface microRouterMapType {
	type: 'vite' | 'vue2' | 'iframe'
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
	'rmaVite',
	'wmsVite',
	'logsVite',
	'productsVite',
	'shippingVite',
	'baseVite',
]

// micro路由 保留基座的header，与基座有互相通信
const origin = window.location.origin

export const microRouterMap: microRouterMapListType = [
	{
		type: 'vite',
		appId: 'omsVite',
		baseUrl: '/child/oms/',
		// appUrl: 'http://localhost:8991/child/oms/',
		appUrl: origin + '/child/oms/',
		router: microRouter.omsVite,
	},
	{
		type: 'vite',
		appId: 'crmVite',
		baseUrl: '/child/crm/',
		appUrl: origin + '/child/crm/',
		router: microRouter.crmVite,
	},
	{
		type: 'vite',
		appId: 'rmaVite',
		baseUrl: '/child/rma/',
		appUrl: origin + '/child/rma/',
		// appUrl: 'http://localhost:8913/child/rma/',
		router: microRouter.rmaVite,
	},
	{
		type: 'vite',
		appId: 'wmsVite',
		baseUrl: '/child/wms/',
		appUrl: origin + '/child/wms/',
		// appUrl: 'http://localhost:8992/child/wms/',
		router: microRouter.wmsVite,
	},
	{
		type: 'vite',
		appId: 'logsVite',
		baseUrl: '/child/logs/',
		appUrl: origin + '/child/logs/',
		// appUrl: 'http://localhost:8992/child/logs/',
		router: microRouter.logsVite,
	},
	{
		type: 'vite',
		appId: 'baseVite',
		baseUrl: '/child/base/',
		appUrl: origin + '/child/base/',
		router: microRouter.baseVite,
	},
	{
		type: 'vite',
		appId: 'shippingVite',
		baseUrl: '/child/shipping/',
		appUrl: origin + '/child/shipping/',
		router: microRouter.shippingVite,
	},
	{
		type: 'vite',
		appId: 'productsVite',
		baseUrl: '/child/products/',
		appUrl: origin + '/child/products/',
		router: microRouter.productsVite,
	},
]

// micro模块 与基座没有通信，不保留基座的东西，这个个页面都是模块的
const defMicroModelMap: microRouterMapListType = [
	{
		type: 'vue2',
		appId: 'erpVue2',
		baseUrl: '/child/erp/',
		// appUrl: 'http://10.17.201.63:8002/child/vue3/',
		// appUrl: 'http://10.17.201.63:8081',
		// appUrl: 'http://10.17.201.63:8080/',
		appUrl: origin + '/child/erp/',
		baseRoute: '/childErp/erpVue2',
		router: microRouter.erpVue2,
	},
]

let microModelMapList = [
	{
		type: 'iframe',
		appId: 'kibana',
		baseUrl: '/child/erp/',
		appUrl: 'http://47.119.141.146:8080/child/erp/',
		baseRoute: '/childErp/kibana',
		router: microRouter.kibana,
	},
	{
		type: 'iframe',
		appId: 'general',
		baseUrl: '/child/erp/',
		appUrl: 'http://47.119.141.146:8080/child/erp/',
		baseRoute: '/childErp/kibana',
		router: microRouter.general,
	},
]

if (import.meta.env.VITE_ENV === 'prod') {
	microModelMapList = []
}
export const microModelMap = [...defMicroModelMap, ...microModelMapList]
