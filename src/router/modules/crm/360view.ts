// 测试
import { RouteRecordRaw } from 'vue-router'

const index: RouteRecordRaw = {
	path: '/userManagement',
	// redirect: '/userManagement/360view',
	name: 'userManagement',
	component: () => import('@/layout/index'),
	meta: {
		title: '用户管理',
		keepAlive: true,
	},
	children: [
		{
			path: '/360view',
			name: 'userManagement360view',
			component: () => import('@/views/modules/crm/360view'),
			meta: {
				title: '用户360视图',
				keepAlive: true,
			},
		},
		{
			path: '/userManagement/giftCard',
			name: 'userManagementGiftCard',
			component: () => import('@/views/modules/crm/giftCard'),
			meta: {
				title: '用户礼品卡',
				keepAlive: true,
			},
		},
	],
}
export default index
