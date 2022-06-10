import { defineComponent, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { RForm } from '@/components'
import { FormRow } from './util'
import { defaultRowProps } from '@/config'
export default defineComponent({
	emits: ['update:value'],
	setup(porp, { emit }) {
		const model = ref<ObjectMap>({})
		const rows = new FormRow(model).data
		function finish(value?: any) {
			emit('update:value', false)
		}
		return () => (
			<Modal
				title="表单Form"
				width={1200}
				visible={true}
				onCancel={finish}
				okButtonProps={{ htmlType: 'submit', ...{ form: 'tableFrom' } }}
			>
				<RForm fid="tableFrom" rows={rows} rowProps={defaultRowProps} model={model.value} finish={finish} />
			</Modal>
		)
	},
})
