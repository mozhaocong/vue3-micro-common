import { defineComponent, ref } from 'vue'
import { Button, Input } from 'ant-design-vue'
export default defineComponent({
	name: 'testChildren1Data3',
	setup() {
		const but = ref<string>('')
		return () => (
			<div>
				<Input v-model={but.value} placeholder={but.value}></Input>
				<Button
					onClick={() => {
						console.log(but.value)
					}}
				>
					点击
				</Button>
			</div>
		)
	},
})
