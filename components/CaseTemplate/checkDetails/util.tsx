import { isArray } from '@/utils'
import { Button, Image } from 'ant-design-vue'

export class FormRow {
	data: FormRowArray
	constructor(formModel?: ObjectMap) {
		this.data = [
			{ title: '工单号', key: 'no' },
			{ title: '创建人', key: 'admin_real_name' },
			{ title: '创建时间', key: 'created_at' },
			{ title: '类型', key: 'type_name' },
			{ title: '订单号', key: 'order_reference_no' },
			{ title: '服务单号', key: 'service_order_no' },
			{ title: '状态', key: 'status_name' },
			{ title: '接收时效', key: 'receiving_actual' },
			{ title: '处理时效', key: 'deal_actual' },
			{ title: '接收时间', key: 'receive_time' },
			{ title: '完成时间', key: 'complete_time' },
			// { title: '复查时间', key: 'review_time' },
			// { title: '复查备注', key: 'review_note' },
		]
	}
}

export class TableRow {
	data: tableColumnsType
	constructor(operationClick?: any) {
		this.data = [
			{ title: '平台SKU', dataIndex: 'product_sku', align: 'center', width: 150 },
			{ title: '新赫特码', dataIndex: 'product_reference_no', align: 'center', width: 150 },
			{ title: '产品名称', dataIndex: 'product_name', align: 'center', width: 150 },
			{ title: '数量', dataIndex: 'num', align: 'center', width: 150 },
			{ title: '业务-不良原因', dataIndex: 'bad_name', align: 'center', width: 150 },
			{
				title: '问题图片',
				dataIndex: 'images',
				align: 'center',
				width: 150,
				customRender: ({ text, record }) => {
					return (
						<>
							{isArray(text)
								? text?.map((item: string) => {
										return <Image width="200" src={item}></Image>
								  })
								: ''}
						</>
					)
				},
			},
			{ title: '问题描述', dataIndex: 'desc', align: 'center', width: 150 },
			// {
			// 	title: '质检方案',
			// 	dataIndex: 'Program',
			// 	align: 'center',
			// 	width: 150,
			// 	customRender: () => {
			// 		return <Button type="primary">展开</Button>
			// 	},
			// },
		]
	}
}

export class SubsetableRow {
	data: tableColumnsType
	constructor(operationClick?: any) {
		this.data = [
			// { title: '状态', dataIndex: 'status_name', align: 'center', width: 150 },
			{ title: '提交日期', dataIndex: 'created_at', align: 'center', width: 150 },
			{ title: '提交人', dataIndex: 'admin_real_name', align: 'center', width: 150 },
			{ title: '质检-不良原因', dataIndex: 'bad_name', align: 'center', width: 150 },
			{ title: '方案备注', dataIndex: 'note', align: 'center', width: 150 },
			// { title: '确认时间', dataIndex: 'deal_time', align: 'center', width: 150 },
			// { title: '拒绝原因', dataIndex: 'reject_note', align: 'center', width: 150 },
		]
	}
}
