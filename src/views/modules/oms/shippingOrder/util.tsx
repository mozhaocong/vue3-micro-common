import { FormBasicData, RRangePicker, FormConfig, MinMaxInput } from '@/components'
import router from '@/router'
import { Button } from 'ant-design-vue'
export class SearchRow {
	data: FormRowArray
	constructor(searchForm?: any) {
		this.data = [
			{
				title: '编号检索',
				key: 'out_repo_order_no',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '订单类型',
				key: 'no',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '运单号',
				key: 'shipping_no',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '订单渠道',
				key: 'no',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '发货仓库',
				key: 'delivery_repo_name',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '分拣员',
				key: 'picking_user_name',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '复核员',
				key: 'distribution_user_name',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '打包员',
				key: 'pack_user_name',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '物流商',
				key: 'shipper_name',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '派送方式',
				key: 'shipper_method_name',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '签出员',
				key: 'delivered_user_name',
				props: {
					placeholder: '请输入',
				},
			},
			{
				title: '创建时间',
				key: 'email',
				component: <RRangePicker />,
				props: {
					placeholder: ['开始时间', '结束时间'],
				},
				keys: [
					['start_time', 'startTime'],
					['end_time', 'endTime'],
				],
			},
			{
				title: '分拣完成时间',
				key: 'email',
				component: <RRangePicker />,
				props: {
					placeholder: ['开始时间', '结束时间'],
				},
				keys: [
					['picking_completed_start_time', 'startTime'],
					['picking_completed_end_time', 'endTime'],
				],
			},
			{
				title: '复核完成时间',
				key: 'email',
				component: <RRangePicker />,
				props: {
					placeholder: ['开始时间', '结束时间'],
				},
				keys: [
					['distribution_completed_start_time', 'startTime'],
					['distribution_completed_end_time', 'endTime'],
				],
			},
			{
				title: '签出完成时间',
				key: 'email',
				component: <RRangePicker />,
				props: {
					placeholder: ['开始时间', '结束时间'],
				},
				keys: [
					['delivered_completed_start_time', 'startTime'],
					['delivered_completed_end_time', 'endTime'],
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
				title: '发货订单信息',
				customRender: ({ text, record }) => {
					return (
						<div>
							<div>发货订单编号: {text.no}</div>
							<div>订单渠道: {text.category}</div>
							<div>出库状态: {text.status_name}</div>
							<div>订单类型: {text.no}</div>
						</div>
					)
				},
			},
			{
				title: '出库产品信息',
				customRender: ({ text, record }) => {
					return (
						<div>
							{text.out_repo_order_items?.map((item: any) => {
								return (
									<>
										<div>SKU: {item.product_new_reference_no}</div>
										<div>Qty: {item.num}</div>
									</>
								)
							})}
						</div>
					)
				},
			},
			{
				title: '出库信息',
				customRender: ({ text, record }) => {
					return (
						<div>
							<div>发货仓库: {text.delivery_repo_name}</div>
							<div>分拣员: {text.picking_user_name}</div>
							<div>打包员: {text.pack_user_name}</div>
							<div>签出员: {text.deliveried_user_name}</div>
						</div>
					)
				},
			},
			{
				title: '物流信息',
				customRender: ({ text, record }) => {
					return (
						<div>
							<div>物流商: {text.shipper_name}</div>
							<div>派送方式: {text.shipper_method_name}</div>
							<div>运单号: {text.shipping_no}</div>
						</div>
					)
				},
			},
			{
				title: '日期',
				customRender: ({ text, record }) => {
					return (
						<div>
							<div>创建日期: {text.created_at}</div>
							<div>分拣完成时间: {text.picking_completed_time}</div>
							<div>复核完成时间: {text.distribution_completed_time}</div>
							<div>打包完成时间: {text.pack_completed_time}</div>
							<div>签出完成时间: {text.deliveried_completed_time}</div>
						</div>
					)
				},
			},
			{
				title: '操作',
				width: 120,
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
