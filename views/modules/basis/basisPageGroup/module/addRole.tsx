import { defineComponent, PropType, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { RForm } from '@/components'
import { editApiRequest } from '@/utils'
import { roleCreate } from '@/api/localhost/base/role'
const Props = {
	recordData: { type: Object as PropType<ObjectMap>, required: true },
} as const

export default defineComponent({
	props: Props,
	emits: ['update:visible'],
	setup(props, { emit }) {
		const formRow: FormRowArray = [
			{
				key: 'roleName',
				title: '角色名称',
				rules: [{ required: true, message: '不能为空' }],
			},
		]
		const model = ref<ObjectMap>({})
		function onCancel() {
			emit('update:visible', false)
		}
		const loading = ref(false)

		async function finish(item: any) {
			const params = { ...item, groupId: props?.recordData?.id }
			const res = await editApiRequest({
				api: () => roleCreate(params),
				setMethod: (item) => {
					loading.value = item
				},
			})
			console.log(res)
		}
		return () => (
			<Modal
				visible={true}
				title={'添加角色'}
				onCancel={onCancel}
				okButtonProps={{ htmlType: 'submit', loading: loading.value, ...{ form: 'addRoleForm' } }}
			>
				<RForm fid={'addRoleForm'} finish={finish} rows={formRow} model={model.value} colSpan={24} />
			</Modal>
		)
	},
})
