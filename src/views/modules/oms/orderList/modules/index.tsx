import { defineComponent, PropType } from 'vue'
import OrderView from './orderView/index'
import { Modal, TabPane, Tabs } from 'ant-design-vue'
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
	setup(prop, { emit, attrs }) {
		function finish() {
			emit('update:value', false)
		}
		return () => (
			<>
				{console.log('GSGS', prop.value, attrs)}
				{prop.value.checkForm && (
					<Modal title="订单详情" width={1500} visible={true} onCancel={finish} onOk={finish}>
						<OrderView {...attrs} />
					</Modal>
				)}
			</>
		)
	},
})
