import { defineComponent, ref } from 'vue'
import { RForm } from '@/components'
import { defaultRowProps } from '@/config'
import { FormRow } from './util'
export default defineComponent({
	name: 'configuration',
	setup() {
		const formRow = new FormRow().data
		const model = ref({
			buttonPermissions: [{}],
		})
		return () => (
			<div>
				<RForm rows={formRow} rowProps={defaultRowProps} model={model.value} colSpan={12} />
			</div>
		)
	},
})
