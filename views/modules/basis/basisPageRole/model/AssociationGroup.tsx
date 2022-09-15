import { defineComponent, ref } from 'vue'
import { asyncApiRes, setTreeData } from '@/utils'
import { groupFindAll } from '@/api/localhost/base/group'
import { Modal, TreeSelect } from 'ant-design-vue'

export default defineComponent({
	emits: ['update:visible'],
	setup(props, { emit }) {
		const treeData = ref<ObjectMap>([])
		const selected = ref()
		function initData() {
			asyncApiRes(groupFindAll(), {}, (item) => {
				const data = setTreeData({ data: item.data })
				treeData.value = data
			})
		}
		initData()

		function onCancel() {
			emit('update:visible', false)
		}
		function onOk() {
			console.log('123456')
		}
		return () => (
			<Modal title={'关联群组'} visible={true} onCancel={onCancel} onOk={onOk}>
				<TreeSelect
					style="width:100%"
					treeDefaultExpandAll={true}
					v-model={[selected.value, 'value']}
					tree-data={treeData.value}
					fieldNames={{ children: 'children', label: 'groupName', value: 'id' }}
				/>
			</Modal>
		)
	},
})
