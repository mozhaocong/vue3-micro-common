import router from '@/router'
import { defineComponent, ref, PropType } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Card, Table } from 'ant-design-vue'
import { RForm, RTable } from '@/components'
import { basicInformation, OutboundInformation, productInformation } from './util'
import { orderOutRepoOrdersId } from '@/api/erp/oms'
import { asyncApiRes, defaultCustomRender, isTrue } from '@/utils'
const pageKey = 'shippingView'
const Props = {
	record: {
		type: Object as PropType<ObjectMap>,
		default: () => {
			return {}
		},
	},
}
export default defineComponent({
	name: pageKey,
	props: Props,
	setup(prop, { attrs }) {
		// const route = useRoute()
		const model = ref<any>({})
		if (isTrue(prop.record)) {
			asyncApiRes(orderOutRepoOrdersId(prop.record.id, 'get'), model)
		}
		const basicInfo = new basicInformation().data
		const OutboundInfo = new OutboundInformation().data
		const productInfo = new productInformation().data
		return () => (
			<>
				<Card title="发货订单基础信息">
					<RForm rows={basicInfo} model={model.value} customRender={defaultCustomRender} />
				</Card>

				<Card title="出库信息">
					<RForm rows={OutboundInfo} model={model.value} customRender={defaultCustomRender} />
				</Card>
				<Card title="出库产品信息">
					<Table dataSource={model.value?.out_repo_order_items} columns={productInfo} />
				</Card>
			</>
		)
	},
})
