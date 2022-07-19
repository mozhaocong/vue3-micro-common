// import { GetQuestionWorkOrderId } from '@child/api/rma/index'
import { RForm } from '@/components'
import { asyncApiRes, defaultCustomRender, isTrue } from '@/utils'
import { Button, Card, Table } from 'ant-design-vue'
import { defineComponent, onActivated, PropType, ref } from 'vue'
import { FormRow, SubsetableRow, TableRow } from './util'
import './index.less'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
const Props = {
	id: {
		type: String as PropType<string>,
		required: true,
	},
}
export default defineComponent({
	props: Props,
	emits: ['update:value'],
	setup(prop) {
		const model = ref<any>({})
		const router = useRouter()
		// asyncApiRes(GetQuestionWorkOrderId(prop?.id, 'get'), model)

		// 返回列表
		function BackToList() {
			router.push({
				name: '',
			})
		}

		const formRow = new FormRow().data
		const tableRow = new TableRow().data
		return () => (
			<div class="workOrderView">
				<div class="topCenter">
					<span class="leftName">详情</span>
					<div class="rightButton">
						<Button type="primary" onClick={BackToList}>
							返回
						</Button>
					</div>
				</div>
				<Card title="基础信息">
					<RForm labelCol={{ span: 10 }} rows={formRow} model={model.value} customRender={defaultCustomRender} />
				</Card>
				<Card title="产品质量问题">
					<Table dataSource={model.value?.work_order_items} columns={tableRow}></Table>
				</Card>
			</div>
		)
	},
})
