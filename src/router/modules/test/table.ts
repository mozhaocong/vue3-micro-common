// 测试
import { KeepAliveView } from '@/components'

const index: any = {
	path: '/test',
	name: 'test',
	component: () => import('@/layout/index'),
	meta: {
		title: '测试',
	},
	children: [
		{
			path: '/test/children1',
			name: 'keepAliveView',
			meta: {
				title: '测试列表1',
				keepAlive: true,
			},
			component: KeepAliveView,
			children: [
				{
					path: '/test/children1/data1',
					name: 'testChildren1Data1',
					component: () => import('@/views/test/table/list'),
					meta: {
						title: '测试列表1页面1',
						keepAlive: true,
					},
				},
				{
					path: '/test/children1/data2',
					name: 'testChildren1Data2',
					component: () => import('@/views/test/test/index'),
					meta: {
						title: '测试列表1页面2',
						keepAlive: true,
					},
				},
				{
					path: '/test/children1/data3',
					name: 'testChildren1Data3',
					component: () => import('@/views/test/test_h/index'),
					meta: {
						title: '测试列表1页面3',
						keepAlive: true,
					},
				},
			],
		},
	],
}
export default index
