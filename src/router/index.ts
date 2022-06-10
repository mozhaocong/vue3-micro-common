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
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index'),
	},
	{
		path: '/lowCode',
		name: 'lowCode',
		component: lowCode,
	},
	{
		path: '/antdTest',
		name: 'antdTest',
		component: () => import('../views/test/antdTest'),
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
