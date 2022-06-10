import { defineComponent, PropType } from 'vue'
import CheckForm from './CheckForm/index'
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
	emits: ['update:value'],
	setup(prop, { attrs }) {
		return () => <>{prop.value.checkForm && <CheckForm v-model={[prop.value.checkForm, 'value']} {...attrs} />}</>
	},
})
