import { RouteRecordRaw } from 'vue-router'

const index: RouteRecordRaw = {
	path: '/basis',
	// redirect: '/basis/userManagement',
	name: 'basis',
	component: () => import('@/layout/index'),
	meta: {
		title: '基础服务',
		keepAlive: true,
		showMenuItem: true,
	},
	children: [
		{
			path: '/basis/userManagement',
			name: 'basisUserManagement',
			component: () => import('@/views/modules/basis/userManagement'),
			meta: {
				title: '用户管理',
				keepAlive: true,
			},
		},
		{
			path: '/basis/pagePermissions',
			name: 'basisPagePermissions',
			component: () => import('@/views/modules/basis/pagePermissions'),
			meta: {
				title: '页面权限',
				keepAlive: true,
			},
		},
		{
			path: '/basis/positionAuthority',
			name: 'basisPositionAuthority',
			component: () => import('@/views/modules/basis/positionAuthority'),
			meta: {
				title: '职位权限',
				keepAlive: true,
			},
		},
	],
}
export default index
