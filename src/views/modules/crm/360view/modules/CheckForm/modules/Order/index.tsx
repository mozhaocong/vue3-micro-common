import { defineComponent, PropType, ref } from 'vue'
import { RTable } from '@/components'
import { customerCardCustomerOrder } from '@/api/erp/crm/customer'
import { TableRow } from './util'
import { asyncApiRes, isTrue } from '@/utils'
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
		const order = ref<any>({})
		if (isTrue(porp.record)) {
			asyncApiRes(customerCardCustomerOrder(porp.record.id, 'get'), order)
		}
		const tableRow = new TableRow().data
		return () => (
			<div>
				<RTable dataSource={order?.value?.data} columns={tableRow} setup={false} sticky={false} />
			</div>
		)
	},
})
