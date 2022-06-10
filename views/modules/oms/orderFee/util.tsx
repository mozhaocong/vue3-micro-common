import { FormConfig, RRangePicker } from '@/components'
import { isTrue } from '@/utils'
import { Image } from 'ant-design-vue'
// import { ref } from 'vue'

export class SearchRow {
	data: FormRowArray
	constructor() {
		this.data = [
			{
				title: '财务编码',
				key: 'no',
			},
			{
				title: '费用类型',
				key: 'type',
				component: <FormConfig />,
				props: {
					prop: 'omsType',
				},
			},
			{
				title: '交易号',
				key: 'transaction_id',
			},
			{
				title: '支付方式',
				key: 'out_type',
				component: <FormConfig />,
				props: {
					prop: 'omsOutType',
				},
			},
			{
				title: '订单号',
				key: 'order_no',
			},
			{
				title: '客户检索',
				key: 'customer_name',
			},
			{
				title: '审核人',
				key: 'audit_user_name',
			},
			{
				title: '支付时间',
				key: 'email',
				component: <RRangePicker />,
				keys: [
					['start_paid_time', 'startTime'],
					['end_paid_time', 'endTime'],
				],
			},
			{
				title: '审核时间',
				key: 'email',
				component: <RRangePicker />,
				keys: [
					['start_audit_time', 'startTime'],
					['end_audit_time', 'endTime'],
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
				title: '财务编码',
				dataIndex: 'shipping_no',
				align: 'center',
				width: 240,
				customRender: ({ record }) => {
					return (
						<div>
							<div>财务编号：{record.no}</div>
							<div>交易号：{record.transaction_id}</div>
							<div>订单ID：{record.order?.id}</div>
							<div>客户ID：{record.customer_id}</div>
						</div>
					)
				},
			},
			{
				title: '支付/类型',
				dataIndex: 'shipping_no',
				align: 'center',
				width: 200,
				customRender: ({ record }) => {
					return (
						<div>
							<div>类型：{record.type_name}</div>
							<div>支付方式：{record.channel_name}</div>
						</div>
					)
				},
			},
			{
				title: '支付信息',
				dataIndex: 'shipper_name',
				align: 'center',
				width: 250,
				customRender: ({ record }) => {
					return (
						<div>
							<div>状态：{record.status_name}</div>
							<div>货币类型：{record.currency}</div>
							<div>汇率：{record.rate}</div>
							<div>原币金额：{record.money}</div>
							<div>美金金额：{record.money_usd}</div>
						</div>
					)
				},
			},
			{
				title: '支付凭证',
				dataIndex: 'images',
				align: 'center',
				width: 200,
				customRender: ({ record, text }) => {
					if (!isTrue(record.previeVisible)) {
						record.previeVisible = false
					}
					let src = ''
					let imgList = []
					if (isTrue(text)) {
						src = text[0].link
						imgList = text
					}
					return (
						<div>
							<Image
								width="200"
								src={src}
								preview={{
									visible: false,
								}}
								onClick={() => {
									record.previeVisible = !record.previeVisible
								}}
							/>
							<div style={{ display: 'none' }}>
								<a-image-preview-group
									preview={{
										visible: record.previeVisible,
										onVisibleChange: () => {
											record.previeVisible = !record.previeVisible
										},
									}}
								>
									{imgList.map((item: any) => {
										return <Image src={item.link} />
									})}
								</a-image-preview-group>
							</div>
						</div>
					)
				},
			},
			{
				title: '操作信息',
				dataIndex: 'expires_on',
				align: 'center',
				width: 300,
				customRender: ({ record }) => {
					return (
						<div>
							<div>审核人：{record.audit_user_name}</div>
							<div>审核时间：{record.audit_time}</div>
							<div>支付时间：{record.paid_time}</div>
						</div>
					)
				},
			},
			{
				title: '备注',
				dataIndex: 'expires_ons',
				align: 'center',
				width: 380,
				customRender: ({ record }) => {
					return (
						<div>
							<div>费用备注：{record.note}</div>
							<div>财务备注：{record.money_note}</div>
							<div>拒绝原因：{record.refuse_reason}</div>
						</div>
					)
				},
			},
		]
	}
}
