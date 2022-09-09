import { defineComponent, PropType } from 'vue'
import Form from './Form/index'
import Form2 from './Form2/index'
const Props = {
	value: {
		type: Object as PropType<ObjectMap>,
		default: () => {
			return {}
		},
	},
}
export default defineComponent({
	props: Props,
	setup(prop) {
		return () => (
			<>
				{prop.value.form && <Form v-model={[prop.value.form, 'value']} />}
				{prop.value.form2 && <Form2 v-model={[prop.value.form2, 'value']} />}
			</>
		)
	},
})
