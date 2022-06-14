import { defineComponent, ref, watch } from 'vue'
import { Dropdown, InputSearch, Menu, MenuItem, Tree } from 'ant-design-vue'
import { debounce, deepClone, isTrue } from '@/utils'

export default defineComponent({
	name: 'routerList.tsx',
	setup() {
		const sourData = [
			{
				title: '0-0',
				key: '0-0',
				children: [
					{
						title: '0-0-0',
						key: '0-0-0',
						children: [
							{ title: '0-0-0-0', key: '0-0-0-0' },
							{ title: '0-0-0-1', key: '0-0-0-1' },
							{ title: '0-0-0-2', key: '0-0-0-2' },
						],
					},
					{
						title: '0-0-1',
						key: '0-0-1',
						children: [
							{ title: '0-0-1-0', key: '0-0-1-0' },
							{ title: '0-0-1-1', key: '0-0-1-1' },
							{ title: '0-0-1-2', key: '0-0-1-2' },
						],
					},
				],
			},
		]

		const expandedKeys = ref<string[]>([])
		const searchValue = ref('')
		const treeData = ref<any[]>(sourData)
		let defaultExpandedKeys: any[] = []
		watch(
			() => expandedKeys.value,
			(value) => {
				if (isTrue(searchValue.value)) {
					return
				}
				defaultExpandedKeys = deepClone(value)
			}
		)

		function searchChange() {
			const returnData: any[] = []
			function arrayData(data: any[]) {
				data.forEach((item) => {
					if (item.key === searchValue.value) {
						returnData.push(item)
						return
					}
					if (isTrue(item.children)) {
						arrayData(item.children)
					}
				})
			}
			if (isTrue(searchValue.value)) {
				arrayData(deepClone(sourData))
				treeData.value = returnData
				expandedKeys.value = []
			} else {
				treeData.value = sourData
				expandedKeys.value = defaultExpandedKeys
			}
		}
		const searchTree = debounce(searchChange, 300)
		return () => (
			<div>
				<InputSearch v-model={[searchValue.value, 'value']} onChange={searchTree} placeholder="Search" />
				<Tree
					v-model={[expandedKeys.value, 'expandedKeys']}
					tree-data={treeData.value}
					v-slots={{
						title: (item: any) => {
							const { title } = item
							return (
								<Dropdown
									trigger={['contextmenu']}
									v-slots={{
										overlay: () => {
											return (
												<Menu>
													<MenuItem key="1">添加下类</MenuItem>
													<MenuItem key="2">删除该类</MenuItem>
												</Menu>
											)
										},
									}}
								>
									<span
										onClick={() => {
											const { key, children } = item
											if (!isTrue(children)) return
											if (expandedKeys.value.includes(key)) {
												expandedKeys.value = expandedKeys.value.filter((item) => item !== key)
											} else {
												const data = deepClone(expandedKeys.value)
												data.push(key)
												expandedKeys.value = data
											}
										}}
									>
										{title}
									</span>
								</Dropdown>
							)
						},
					}}
				/>
			</div>
		)
	},
})
