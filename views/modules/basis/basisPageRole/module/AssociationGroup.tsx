import { defineComponent, PropType, ref } from 'vue'
import { asyncApiRes, setTreeData } from '@/utils'
import { groupFindAll } from '@/api/localhost/base/group'
import { Modal, TreeSelect } from 'ant-design-vue'
import { roleUpdate } from '@/api/localhost/base/role'
const Props = {
	record: { type: Object as PropType<ObjectMap>, required: true },
} as const

export default defineComponent({
	emits: ['update:visible', 'success'],
	props: Props,
	setup(props, { emit }) {
		const treeData = ref<ObjectMap>([])
		const selected = ref()
		function initData() {
			asyncApiRes(groupFindAll(), {}, (item) => {
				const {
					data: { list },
				} = item
				const data = setTreeData({ data: list })
				treeData.value = data
			})
		}
		initData()

		function onCancel() {
			emit('update:visible', false)
		}
		async function onOk() {
			const data = { ...props.record, groupId: selected.value }
			const res = await roleUpdate(data)
			emit('success', true)
			onCancel()
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
