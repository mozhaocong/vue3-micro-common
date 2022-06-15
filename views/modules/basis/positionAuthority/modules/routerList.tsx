import { defineComponent, ref } from 'vue'
import { Menu, MenuItem } from 'ant-design-vue'
import LocalRouter from './localRouter'
import SearchTree from '@/views/modules/basis/positionAuthority/components/SearchTree'

const Props = {
	value: null,
} as const
export default defineComponent({
	name: 'routerList.tsx',
	props: Props,
	emits: ['select'],
	setup(props, { emit }) {
		const sourData = ref([
			{
				name: 'basisModules',
				path: 'basisModules',
				title: 'basisModules',
				children: [
					{
						name: 'basis',
						path: '/basis',
						title: '基础服务',
						children: [
							{ name: 'basisUserManagement', path: '/basis/userManagement', title: '用户管理' },
							{ name: 'basisPagePermissions', path: '/basis/pagePermissions', title: '页面权限' },
							{ name: 'basisPositionAuthority', path: '/basis/positionAuthority', title: '职位权限' },
						],
					},
				],
			},
		])

		return () => (
			<div>
				<LocalRouter />
				<SearchTree
					treeData={sourData.value}
					fieldNames={{ children: 'children', title: 'title', key: 'name' }}
					onSelect={(item) => {
						emit('select', item)
					}}
					dropdownOverlay={(item) => {
						return (
							<Menu>
								<MenuItem key={1}>添加路由</MenuItem>
								<MenuItem key={2}>删除路由</MenuItem>
							</Menu>
						)
					}}
				/>
			</div>
		)
	},
})
