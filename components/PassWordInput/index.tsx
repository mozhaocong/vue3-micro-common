import { defineComponent, ref, watch, PropType, App, Plugin, markRaw } from 'vue'
import { Input } from 'ant-design-vue'
import password from '../../assets/image/password.png'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
const propsData = {
	value: {
		type: String as PropType<string>,
	},
} as const

const _PassWordInput = defineComponent({
	props: propsData,
	name: 'PassWordInput',
	emits: ['change', 'update:value'],
	setup(props, context) {
		const stateData = ref<string | number | undefined>(props.value)
		const inputState = ref('password')
		function change() {
			context.emit('update:value', stateData.value)
			context.emit('change', stateData.value)
		}
		watch(
			() => props.value,
			(value) => {
				stateData.value = value as string
			},
			{}
		)
		return () => (
			<Input
				v-model={[stateData.value, 'value']}
				{...context.attrs}
				onChange={change}
				type={inputState.value}
				v-slots={{
					prefix: () => {
						return <img class="imageIcon" src={password}></img>
					},
					suffix: () => {
						return inputState.value === 'password' ? (
							<EyeOutlined
								onClick={() => {
									inputState.value = 'input'
								}}
							/>
						) : (
							<EyeInvisibleOutlined
								style="font-size:18px"
								onClick={() => {
									inputState.value = 'password'
								}}
							/>
						)
					},
				}}
			/>
		)
	},
})

_PassWordInput.install = function (app: App) {
	app.component(_PassWordInput.name, _PassWordInput)
	return app
}
export default markRaw(_PassWordInput) as typeof _PassWordInput & Plugin
