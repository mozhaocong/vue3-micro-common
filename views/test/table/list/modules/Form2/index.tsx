import { defineComponent, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { RForm } from '@/components'
import { FormRow } from './util'
export default defineComponent({
	emits: ['update:value'],
	setup(porp, { emit }) {
		const model = ref<ObjectMap>({})
		const rows = new FormRow().data
		function finish() {
			emit('update:value', false)
		}
		return () => (
			<Modal
				title="表单2Form"
				width={1200}
				visible={true}
				onCancel={finish}
				okButtonProps={{ htmlType: 'submit', ...{ form: 'tableFrom' } }}
			>
				<RForm fid="tableFrom" rows={rows} model={model.value} finish={finish} />
			</Modal>
		)
	},
})
