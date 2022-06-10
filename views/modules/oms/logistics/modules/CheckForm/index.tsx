import { defineComponent, PropType, ref } from 'vue'
import { Modal, Card } from 'ant-design-vue'
import { RForm, RTable } from '@/components'
import { orderShippingIdDeclareOrders } from '@/api/erp/oms'
import { SearchRowShip, TableRowShip } from './util'
import { asyncApiRes, isTrue, defaultCustomRender } from '@/utils'
const Props = {
	value: {
		type: Boolean as PropType<boolean>,
	},
	record: {
		type: Object as PropType<ObjectMap>,
		default() {
			return {}
		},
	},
}
export default defineComponent({
	props: Props,
	emits: ['update:value'],
	setup(porp, { emit }) {
		function finish() {
			emit('update:value', false)
		}
		const data = ref({})
		if (isTrue(porp.record)) {
			asyncApiRes(orderShippingIdDeclareOrders(porp.record.id, 'get'), data)
		}
		const searchshipping = new SearchRowShip().data
		const tableRowShip = new TableRowShip().data
		return () => (
			<Modal title="物流详情" width={1400} visible={true} onCancel={finish} onOk={finish}>
				<Card title="物流基础信息">
					<RForm rows={searchshipping} model={data.value} customRender={defaultCustomRender} />
				</Card>
				<Card title="物流基础信息">
					<RTable dataSource={[]} columns={tableRowShip} sticky={false} setup={false} />
				</Card>
			</Modal>
		)
	},
})
