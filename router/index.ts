import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import lowCode from '@/lowCode'
import { ISWEbHASHHISTORY } from '@/microAppMethod'

const history = ISWEbHASHHISTORY ? createWebHashHistory() : createWebHistory(import.meta.env.BASE_URL)

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/layout/index'),
	},
	// 登录页
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index'),
	},
	// 低代码生成页
	{
		path: '/lowCode',
		name: 'lowCode',
		component: lowCode,
	},
	// 测试调试页
	{
		path: '/antdTest',
		name: 'antdTest',
		component: () => import('../views/test/antdTest'),
	},
	{
		path: '/testTable',
		name: 'testTable',
		component: () => import('../views/test/table'),
	},
	{
		path: '/testComponents',
		name: 'antdTest',
		component: () => import('../views/test/components'),
	},

	// {
	// 	path: '/:pathMatch(.*)',
	// 	//访问主页的时候 重定向到index页面
	// 	redirect: '/404',
	// },
	// {
	// 	path: '/404',
	// 	name: '/404',
	// 	component: import('@/views/404'),
	// },
]
const router = createRouter({
	history,
	routes,
})
export default router
