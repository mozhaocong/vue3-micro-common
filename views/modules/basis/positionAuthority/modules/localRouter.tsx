import { defineComponent, ref } from 'vue'
import { Button, Menu, MenuItem, Modal } from 'ant-design-vue'
import { copyText, deepClone, isTrue, setArrayData } from '@/utils'
import SearchTree from '@/views/modules/basis/positionAuthority/components/SearchTree'
import { useStore } from 'vuex'
export default defineComponent({
	name: 'LocalRouter',
	setup() {
		const { state } = useStore()
		const visible = ref(false)
		const sourData = ref<any[]>([])
		return () => (
			<div>
				<Button
					onClick={() => {
						const data = setArrayData(deepClone(state.erpLayout?.layoutRouterData), (res) => {
							const { name, path, title, children } = res
							const data: ObjectMap = { name, path, title }
							if (isTrue(children)) {
								data.children = children
							}
							return data
						})
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
											key={1}
											onClick={() => {
												copyText(JSON.stringify(item.data))
											}}
										>
											复制当前路由信息
										</MenuItem>
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
