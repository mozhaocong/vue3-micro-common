import { defineComponent, ref } from 'vue'
import { asyncApiRes, isTrue, requestChangeLoading, setTreeData } from '@/utils'
import { groupCreate, groupDelete, groupFindParams, groupUpdate } from '@/api/localhost/base/group'
import { Tree, Dropdown, Modal, Popconfirm } from 'ant-design-vue'
import { RForm } from '@/components'

const groupRowList: FormRowArray = [
	{ title: '群组名称', key: 'groupName', rules: [{ required: true, message: '群组名称不能为空' }] },
]

export default defineComponent({
	emits: ['click'],
	setup(props, { emit }) {
		const treeData = ref<any[]>([])
		const buttonLoading = ref(false)
		const selectedKeys = ref<any[]>([])
		const modalData = ref<ObjectMap>({
			visible: false,
			title: '添加',
		})
		const groupData = ref({})
		// 当前选中数据
		let currentRecord: any = null
		function initData() {
			asyncApiRes(groupFindParams(), {}, (item) => {
				console.log('item', item)
				const {
					data: { list },
				} = item
				const data = setTreeData({ data: list })
				treeData.value = data
			})
		}

		initData()

		function menuItemClick(item: any, e: any) {
			const { groupName } = item
			const { key } = e
			currentRecord = { item, key }
			switch (key) {
				case 'add':
					groupData.value = {}
					modalData.value = {
						visible: true,
						title: `${groupName} 添加群组`,
					}
					break
				case 'edit':
					groupData.value = {
						groupName: groupName,
					}
					modalData.value = {
						visible: true,
						title: `${groupName} 修改名称`,
					}

					break
			}
			console.log(item)
		}

		async function groupFormFinish(value: any) {
			const { item, key } = currentRecord
			const { data } = item
			let params = {}
			switch (key) {
				case 'edit': {
					params = { ...data, ...value }
					const res = await requestChangeLoading({ api: groupUpdate(params), value: buttonLoading })
					console.log(res)
					break
				}
				case 'add': {
					params = { pId: item.id, ...value }
					const res = await requestChangeLoading({ api: groupCreate(params), value: buttonLoading })
					console.log(res)
					break
				}
			}
			modalData.value.visible = false
			initData()
			console.log(params)
		}

		function onSelect(item: any, e: any) {
			const {
				node: { eventKey, dataRef },
			} = e
			emit('click', dataRef)
			selectedKeys.value = [eventKey]
		}

		async function deleteGroup(item: any) {
			const res = await groupDelete(item)
			initData()
		}

		return () => (
			<div>
				{isTrue(treeData.value) && (
					<Tree
						v-model={[selectedKeys.value, 'selectedKeys']}
						tree-data={treeData.value}
						defaultExpandAll={true}
						fieldNames={{ children: 'children', title: 'groupName', key: 'id' }}
						onSelect={onSelect}
						v-slots={{
							title: (item: any) => {
								return (
									<Dropdown
										trigger={['contextmenu']}
										getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
										v-slots={{
											overlay: () => {
												return (
													<a-menu onClick={(e: any) => menuItemClick(item, e)} style="width:150px">
														<a-menu-item key="add">添加下级</a-menu-item>
														<a-menu-item key="edit">修改群组名称</a-menu-item>
														<Popconfirm title={`确定删除 ${item.groupName}`} onConfirm={() => deleteGroup(item.data)}>
															<a-menu-item key="delete">删除</a-menu-item>
														</Popconfirm>
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
				<Modal
					title={modalData.value.title}
					visible={modalData.value.visible}
					onCancel={() => (modalData.value.visible = false)}
					okButtonProps={{ htmlType: 'submit', loading: buttonLoading.value, ...{ form: 'groupForm' } }}
				>
					<div>
						<RForm fid="groupForm" colSpan={24} rows={groupRowList} model={groupData.value} finish={groupFormFinish} />
					</div>
				</Modal>
			</div>
		)
	},
})
