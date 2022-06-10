// 测试
import { RouteRecordRaw } from 'vue-router'

const index: RouteRecordRaw = {
	path: '/omsTest',
	// redirect: '/userManagement/360view',
	name: 'omsTest',
	component: () => import('@/layout/index'),
	meta: {
		title: '订单管理',
		keepAlive: true,
	},
	children: [
		{
			path: '/omsTest/orderList',
			name: 'orderList',
			component: () => import('@/views/modules/oms/orderList'),
			meta: {
				title: '订单列表',
				keepAlive: true,
			},
		},
		{
			path: '/omsTest/shippingOrder',
			name: 'shippingOrder',
			component: () => import('@/views/modules/oms/shippingOrder'),
			meta: {
				title: '发货订单',
				keepAlive: true,
			},
		},
		{
			path: '/omsTest/logistics',
			name: 'logistics',
			component: () => import('@/views/modules/oms/logistics'),
			meta: {
				title: '物流列表',
				keepAlive: true,
			},
		},
		{
			path: '/omsTest/orderFee',
			name: 'orderFee',
			component: () => import('@/views/modules/oms/orderFee'),
			meta: {
				title: '订单费用',
				keepAlive: true,
			},
		},
		{
			path: '/omsTest/record',
			name: 'record',
			component: () => import('@/views/modules/oms/record'),
			meta: {
				title: '退货记录',
				keepAlive: true,
			},
		},
	],
}
export default index
