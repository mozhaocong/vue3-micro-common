import { FormConfig, FormBasicData, MinMaxInput, RRangePicker } from '@/components'
import { Button } from 'ant-design-vue'

export class SearchRow {
	data: FormRowArray
	constructor() {
		this.data = [
			{
				title: '礼品卡',
				key: 'code',
			},
			{
				title: '是否生效',
				key: 'status',
				component: <FormConfig />,
				props: {
					prop: 'baseEffective',
				},
			},
			{
				title: '有效期',
				key: 'email',
				component: <RRangePicker />,
				keys: [
					['start_expires_on', 'startTime'],
					['end_expires_on', 'endTime'],
				],
			},
			{
				title: '创建人',
				key: 'customer_id',
				component: <FormBasicData />,
				props: {
					prop: 'basicSysUserList',
				},
			},
			{
				title: '客户邮箱',
				key: 'email',
			},
			{
				title: '礼品卡价值',
				key: 'email',
				component: <MinMaxInput />,
				keys: [
					['start_initial_value', 'minValue'],
					['end_initial_value', 'maxValue'],
				],
			},
		]
	}
}

export class TableRow {
	data: tableColumnsType
	constructor(operationConfig?: any) {
		this.data = [
			{ title: '礼品卡', dataIndex: 'code', align: 'center', width: 150 },
			{
				title: '余额/价值',
				dataIndex: 'balance',
				align: 'center',
				width: 150,
				customRender: ({ record }) => {
					return record.balance + '/' + record.initial_value
				},
			},
			{ title: '客户邮箱', dataIndex: ['customer', 'email'], align: 'center', width: 200 },
			{ title: '是否生效', dataIndex: 'status_name', align: 'center', width: 150 },
			{
				title: '有效期',
				dataIndex: 'expires_on',
				align: 'center',
				width: 300,
				customRender: ({ text }) => {
					return text || '无限制'
				},
			},
			{ title: '关联订单', dataIndex: 'order_no', align: 'center', width: 150 },
			{ title: '创建日期', dataIndex: 'created_at', align: 'center', width: 300 },
			{
				title: '创建人',
				dataIndex: 'customer',
				align: 'center',
				width: 150,
				customRender: ({ text }) => {
					if (text) {
						return text.first_name + text.last_name
					} else {
						return ''
					}
				},
			},
			{
				title: '操作',
				dataIndex: 'operation',
				align: 'center',
				width: 150,
				customRender: ({ record }) => {
					return (
						<div>
							<Button
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
