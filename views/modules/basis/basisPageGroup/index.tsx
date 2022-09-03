import { defineComponent, ref } from 'vue'
import { asyncApiRes, isTrue, setTreeData } from '@/utils'
import { groupFindAll } from '@/api/localhost/base/group'
import { Tree, Dropdown, Modal } from 'ant-design-vue'
import { RForm } from '@/components'


const groupRowList:FormRowArray = [
	{name: '群组名称'}
]

export default defineComponent({
	name: 'basisPageGroup',
	setup() {
		const modalVisible = ref(false)
		const treeData = ref<any[]>([])
		asyncApiRes(groupFindAll(), {}, (item) => {
			const data = setTreeData({ data: item.data })
			treeData.value = data
		})
		function menuItemClick(item: any) {
			console.log(item)
		}
		return () => (
			<div>
				{isTrue(treeData.value) && (
					<Tree
						tree-data={treeData.value}
						defaultExpandAll={true}
						fieldNames={{ children: 'children', title: 'groupName', key: 'id' }}
						v-slots={{
							title: (item: any) => {
								return (
									<Dropdown
										trigger={['contextmenu']}
										getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
										v-slots={{
											overlay: () => {
												return (
													<a-menu onClick={() => menuItemClick(item)} style="width:150px">
														<a-menu-item key="1">添加下级</a-menu-item>
														<a-menu-item key="2">修改群组名称</a-menu-item>
														<a-menu-item key="3">删除</a-menu-item>
													</a-menu>
												)
											},
										}}
									>
										<div>{item.groupName}</div>
									</Dropdown>
								)
							},
						}}
					/>
				)}
				<Modal visible={modalVisible.value}>
					<div>
						<RForm rows={} >
					</div>
				</Modal>
			</div>
		)
	},
})
