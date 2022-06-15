import { defineComponent, ref } from 'vue'
import { Button, Menu, MenuItem, Modal } from 'ant-design-vue'
import { erpLayoutModule } from '@/store/modules/erp/public/layout'
import { deepClone, isTrue, setArrayData } from '@/utils'
import SearchTree from '@/views/modules/basis/positionAuthority/components/SearchTree'
export default defineComponent({
	name: 'LocalRouter',
	setup() {
		const visible = ref(false)

		const sourData = ref<any[]>([])
		return () => (
			<div>
				<Button
					onClick={() => {
						const data = setArrayData(deepClone(erpLayoutModule.layoutRouterData), (res) => {
							const { name, path, title, children } = res
							const data: ObjectMap = { name, path, title }
							if (isTrue(children)) {
								data.children = children
							}
							return data
						})
						console.log('data', data)
						sourData.value = data
						visible.value = true
					}}
				>
					获取本地路由
				</Button>
				<Modal v-model={[visible.value, 'visible']}>
					<div>
						<SearchTree
							treeData={sourData.value}
							fieldNames={{ children: 'children', title: 'title', key: 'name' }}
							dropdownOverlay={(item) => {
								return (
									<Menu>
										<MenuItem
											key="1"
											onClick={() => {
												console.log(item)
											}}
										>
											添加下类
										</MenuItem>
										<MenuItem key="2">删除该类</MenuItem>
									</Menu>
								)
							}}
						/>
					</div>
				</Modal>
			</div>
		)
	},
})
