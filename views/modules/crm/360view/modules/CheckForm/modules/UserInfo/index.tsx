import { defineComponent, PropType, ref } from 'vue'
import { customerDetails } from '@/api/erp/crm/customer'
import { Card } from 'ant-design-vue'
import { RForm } from '@/components'
import { BasicInfo } from './util'
import { asyncApiRes, defaultCustomRender, isTrue } from '@/utils'
const Props = {
	record: {
		type: Object as PropType<ObjectMap>,
	},
}
export default defineComponent({
	props: Props,
	setup(porp) {
		const model = ref({})
		if (isTrue(porp.record)) {
			asyncApiRes(customerDetails(porp.record?.id, 'get'), model)
			console.log(model.value)
		}
		const basicInfo = new BasicInfo().data
		return () => (
			<Card title="用户基础信息">
				<RForm rows={basicInfo} model={model.value} customRender={defaultCustomRender} />
			</Card>
		)
	},
})
