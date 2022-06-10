import { orderApiOrdersId } from '@/api/erp/oms'
import { RForm } from '@/components'
import { asyncApiRes, defaultCustomRender, isTrue } from '@/utils'
import { Card, Table } from 'ant-design-vue'
import { defineComponent, PropType, ref } from 'vue'
import { BasicInformation, BroductInformation, BummaryDetails, PaymentInformation } from './util'
const Props = {
	record: {
		type: Object as PropType<ObjectMap>,
	},
}
const pageKey = 'orderView'
export default defineComponent({
	name: pageKey,
	props: Props,
	emits: ['update:value'],
	setup(prop) {
		console.log(prop.record)
		const model = ref<any>({})
		if (isTrue(prop.record)) {
			asyncApiRes(orderApiOrdersId(prop.record?.id, 'get'), model)
		}
		const basicInfo = new BasicInformation().data
		const BummaryDetailsData = new BummaryDetails().data
		const ProductInfo = new BroductInformation().data
		const PaymentInfo = new PaymentInformation().data
		return () => (
			<>
				<Card title="用户基础信息">
					<RForm labelCol={{ span: 10 }} rows={basicInfo} model={model.value} customRender={defaultCustomRender} />
				</Card>
				<Card title="订单商品信息">
					<Table dataSource={model.value?.order_items} columns={ProductInfo} />
				</Card>
				<Card title="费用汇总明细">
					<RForm
						labelCol={{ span: 10 }}
						rows={BummaryDetailsData}
						model={model.value}
						customRender={defaultCustomRender}
					/>
				</Card>
				<Card title="原单支付信息">
					<Table dataSource={model.value?.money} columns={PaymentInfo} />
				</Card>
			</>
		)
	},
})
