import { FormConfig, RRangePicker } from '@/components'
import { Button } from 'ant-design-vue'

export class SearchRow {
	data: FormRowArray
	constructor() {
		this.data = [
			{
				title: '退货单编码',
				key: 'plat_no',
			},
			{
				title: '运单号',
				key: 'shipping_no',
			},
			{
				title: '退货进度',
				key: 'status',
				component: <FormConfig />,
				props: {
					prop: 'omsGoods',
				},
			},
			{
				title: '服务单号',
				key: 'service_order_no',
			},
			{
				title: '物流商名称',
				key: 'shipping_name',
			},
			{
				title: '登记时间',
				key: 'email',
				component: <RRangePicker />,
				keys: [
					['start_shipping_created_time', 'startTime'],
					['end_shipping_created_time', 'endTime'],
				],
			},
		]
	}
}

export class TableRow {
	data: tableColumnsType
	constructor(operationConfig?: any) {
		this.data = [
			{
				title: '退货信息',
				dataIndex: 'plat_no',
				align: 'center',
				width: 280,
				customRender: ({ record }) => {
					return (
						<div>
							<div>退货编号：{record.plat_no}</div>
							<div>退货进度：{record.status_name}</div>
						</div>
					)
				},
			},
			{
				title: '关联单据（参考单号）',
				dataIndex: 'shipping_no',
				align: 'center',
				width: 280,
				customRender: ({ record }) => {
					return (
						<div>
							<div>服务单号：{record?.service_order?.no}</div>
						</div>
					)
				},
			},
			{
				title: '退货产品',
				dataIndex: 'shipper_name',
				align: 'center',
				width: 350,
				customRender: ({ record }) => {
					return (
						<div>
							{record.return_product_order_items.map((item: any) => {
								return (
									<div>
										<span style="margin-right:15px;">SKU：{item.reference_no}</span> <span>Qty：{item.num}</span>
									</div>
								)
							})}
						</div>
					)
				},
			},
			{
				title: '时间',
				dataIndex: 'shipping_created_time',
				align: 'center',
				width: 300,
				customRender: ({ record }) => {
					return (
						<div>
							<div>登记时间：{record.shipping_created_time}</div>
						</div>
					)
				},
			},
			{
				title: '跟进信息',
				dataIndex: 'shipping_name',
				align: 'center',
				width: 300,
				customRender: ({ record }) => {
					return (
						<div>
							<div>物流：{record.shipping_name}</div>
							<div>运单号：{record.shipping_no}</div>
						</div>
					)
				},
			},
			{
				title: '操作',
				dataIndex: 'operation',
				customRender: ({ record }) => {
					return (
						<div>
							<Button
								type="primary"
								onClick={() => {
									operationConfig.setModuleData({
										record: record,
									})
									operationConfig.setModuleState({ checkForm: true })
								}}
							>
								查看
							</Button>
						</div>
					)
				},
			},
		]
	}
}
