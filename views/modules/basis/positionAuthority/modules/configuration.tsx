import { defineComponent, PropType, ref, watch } from 'vue'
import { RForm } from '@/components'
import { defaultRowProps } from '@/config'
import { FormRow } from './util'
const Props = {
	routerData: {
		type: Object as PropType<ObjectMap>,
		default() {
			return {}
		},
	},
} as const
export default defineComponent({
	name: 'configuration',
	props: Props,
	setup(props) {
		const formRow = new FormRow().data
		const model = ref({
			buttonPermissions: [{}],
		})

		watch(
			() => props.routerData,
			(value) => {
				const { buttonPermissions = [{}] } = value
				model.value = { ...value, buttonPermissions }
			}
		)
		return () => (
			<div>
				<RForm rows={formRow} rowProps={defaultRowProps} model={model.value} colSpan={12} />
			</div>
		)
	},
})
