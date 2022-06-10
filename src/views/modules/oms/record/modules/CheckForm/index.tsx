import { defineComponent, PropType, ref } from 'vue'
import { Modal, Card } from 'ant-design-vue'
import { RForm, RTable } from '@/components'
import { orderReturnIdProductOrders } from '@/api/erp/oms'
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
		const data = ref<any>({})
		if (isTrue(porp.record)) {
			asyncApiRes(orderReturnIdProductOrders(porp.record.id, 'get'), data)
		}
		const searchshipping = new SearchRowShip().data
		const tableRowShip = new TableRowShip().data
		return () => (
			<Modal title="退货记录详情" width={1400} visible={true} onCancel={finish} onOk={finish}>
				<Card title="退货记录基础信息">
					<RForm rows={searchshipping} model={data.value} customRender={defaultCustomRender} />
				</Card>
				<Card title="退货产品信息">
					<RTable
						dataSource={data?.value?.return_product_order_items}
						columns={tableRowShip}
						sticky={false}
						setup={false}
					/>
				</Card>
			</Modal>
		)
	},
})
