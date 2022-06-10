import { defineComponent, PropType } from 'vue'
import OrderView from './shippingView/index'
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
				{prop.value.checkForm && (
					<Modal title="发货订单详情" width={1500} visible={true} onCancel={finish} onOk={finish}>
						<OrderView {...attrs} />
					</Modal>
				)}
			</>
		)
	},
})
