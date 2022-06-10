import { FormConfig, MinMaxInput, RRangePicker } from '@/components'
import { Button } from 'ant-design-vue'

export class SearchRow {
	data: FormRowArray
	constructor() {
		this.data = [
			{
				title: '编号检索',
				key: 'out_repo_order_no',
			},
			{
				title: '物流商',
				key: 'shipping_name',
			},
			{
				title: '运单号',
				key: 'shipping_no',
			},
			{
				title: '订单渠道',
				key: 'category',
			},
			{
				title: '发货仓库',
				key: 'delivery_repo_name',
			},
			{
				title: '派送方式',
				key: 'shipping_method_name',
			},
			{
				title: '包裹状态',
				key: 'status',
				component: <FormConfig />,
				props: {
					prop: 'omsStatus',
				},
			},
			{
				title: '目的国家',
				key: 'consignee_country_name',
			},
			{
				title: '签收时效',
				key: 'email',
				component: <MinMaxInput />,
				keys: [
					['delivery_day_min', 'minValue'],
					['delivery_day_max', 'maxValue'],
				],
			},
			{
				title: '发货时间',
				key: 'email',
				component: <RRangePicker />,
				keys: [
					['delivered_completed_start_time', 'startTime'],
					['delivered_completed_end_time', 'endTime'],
				],
			},
			{
				title: '签收时间',
				key: 'email',
				component: <RRangePicker />,
				keys: [
					['sign_start_time', 'startTime'],
					['sign_end_time', 'endTime'],
				],
			},
			{
				title: '审单时间',
				key: 'email',
				component: <RRangePicker />,
				keys: [
					['audit_start_time', 'startTime'],
					['audit_end_time', 'endTime'],
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
				title: '包裹信息',
				dataIndex: 'shipping_no',
				align: 'center',
				width: 240,
				customRender: ({ text }) => {
					return <div>运单号：{text}</div>
				},
			},
			{
				title: '关联订单',
				dataIndex: 'shipping_no',
				align: 'center',
				width: 240,
			},
			{
				title: '发货信息',
				dataIndex: 'shipper_name',
				align: 'center',
				width: 350,
				customRender: ({ record }) => {
					return (
						<div>
							<div>发货仓库：{record?.out_repo_order?.delivery_repo_name}</div>
							<div>物流商：{record.shipper_name}</div>
							<div>派送方式：{record.shipper_method_name}</div>
							<div>目的国家：{record.consignee_country_name}</div>
						</div>
					)
				},
			},
			{
				title: '时间',
				dataIndex: 'created_at',
				align: 'center',
				width: 350,
				customRender: ({ record }) => {
					return (
						<div>
							<div>审单时间：{record?.out_repo_order?.audit_time}</div>
							<div>发货时间：{record?.out_repo_order?.deliveried_completed_time}</div>
							<div>签收时间：{record.sign_time}</div>
							<div>签收时效：{record.transit_day}</div>
						</div>
					)
				},
			},
			{
				title: '账单信息',
				dataIndex: 'expires_on',
				align: 'center',
				width: 350,
				customRender: ({ record }) => {
					return (
						<div>
							<div>包裹实际重量：{record?.out_repo_order?.real_weight}</div>
							<div>实际运费：{record?.out_repo_order?.freight_price_usd}</div>
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
