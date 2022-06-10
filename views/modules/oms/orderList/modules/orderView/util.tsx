export class BasicInformation {
	// 订单基础信息
	data: FormRowArray
	constructor() {
		this.data = [
			{
				title: '订单编号',
				key: 'no',
			},
			{ title: '原单号', key: 'reference_no' },
			{ title: '客户ID', key: 'customer_id' },
			// { title: '订单来源渠道', key: '' },
			{ title: '订单来源端口', key: 'channel_name' },
			{ title: '订单状态', key: 'status_name' },
			{ title: '平台创建时间', key: 'plat_created_time' },
			{ title: '系统创建时间', key: 'created_at' },
			{ title: '订单渠道', key: 'category_name' },
			{ title: '付款状态', key: 'paid_status_name' },
			{ title: '货币类型', key: 'currency' },
			{ title: '汇率', key: 'rate' },
			{ title: '业务员', key: 'user_name' },
			{
				title: '审核人',
				key: '',
				customRender: ({ record }) => {
					record.out_repo_orders?.map((item: any) => {
						return <div>{item.audit_user_name}</div>
					})
				},
			},
			{
				title: '审核时间',
				key: '',
				customRender: ({ record }) => {
					record.out_repo_orders?.map((item: any) => {
						return <div>{item.audit_time}</div>
					})
				},
			},
			{ title: '付款完成时间', key: 'paid_time' },
			{ title: '发货时间', key: 'deliveried_time' },
			{
				title: '冻结时间',
				key: '',
				customRender: ({ record }) => {
					record.out_repo_orders?.map((item: any) => {
						return <div>{item.freeze_time}</div>
					})
				},
			},
			{
				title: '冻结原因',
				key: 'null19',
				customRender: ({ record }) => {
					record.out_repo_orders?.map((item: any) => {
						return <div>{item.freeze_note}</div>
					})
				},
			},
			{ title: '关闭原因', key: 'close_reason' },
			{ title: '订单备注', key: 'order_note' },
			{ title: '客服备注', key: 'salesman_note ' },
		]
	}
}

export class BummaryDetails {
	// 费用汇总明细
	data: FormRowArray
	constructor() {
		this.data = [
			{ title: '商品总金额（原币)', key: 'total_items_price' },
			{ title: '订单总金额（原币)', key: 'total_price' },
			{ title: '优惠券金额（原币)', key: 'total_discount_price' },
			{ title: '礼品卡金额（原币)', key: 'total_gift_price' },
			{ title: '积分抵扣金额（原币)', key: 'total_point_price' },
			{ title: 'VIP优惠金额（原币)', key: 'total_vip_price' },
			{ title: '手续费（原币)', key: 'total_service_price' },
			{ title: '订单运费（原币)', key: 'total_freight_price' },
			{ title: '税费（原币)', key: 'total_tax_price' },
			{ title: '商品总金额(美元)', key: 'total_items_price_usd' },
			{ title: '订单总金额（美元)', key: 'total_price_usd' },
			{ title: '优惠券金额(美元)', key: 'total_discount_price_usd' },
			{ title: '礼品卡金额(美元)', key: 'total_gift_price_usd' },
			{ title: '积分抵扣金额（(美元)', key: 'total_point_price_usd' },
			{ title: 'VIP优惠金额(美元)', key: 'total_vip_price_usd' },
			{ title: '手续费(美元)', key: 'total_service_price_usd' },
			{ title: '订单运费(美元)', key: 'total_freight_price_usd' },
			{ title: '税费（(美元)', key: 'total_tax_price_usd' },
			{ title: '订单总成本(原币)', key: 'total_cost' },
			{ title: '订单总成本（美元)', key: 'total_cost_usd' },
			{ title: '订单预估利润（原币)', key: 'total_estimate_profit' },
			{ title: '订单预估利润（美元)', key: 'total_estimate_profit_usd' },
			// { title: '订单预估利润率（美元)', key: 'null22' },
			{ title: '订单实际利润(原币)', key: 'total_real_profit' },
			{ title: '订单实际利润(美元)', key: 'total_real_profit_usd' },
			// { title: '订单实际利润率（美元)', key: 'null24' },
		]
	}
}
export class BroductInformation {
	// 订单商品信息
	data: tableColumnsType
	constructor() {
		this.data = [
			// {
			// 	title: '序号',
			// 	align: 'center',
			// 	width: 150,
			// 	customRender: ({ record }) => {
			// 		console.log(record)
			// 		return <div>{record}</div>
			// 	},
			// },
			{
				title: 'SKU图片',
				dataIndex: 'sku_images',
				align: 'center',
				width: 150,
				customRender: ({ record }) => {
					console.log(record)
					return <a-image width="200" src={record.sku_images} />
				},
			},
			{ title: '状态', dataIndex: 'status_name', align: 'center', width: 150 },
			{ title: '平台SKU', dataIndex: 'plat_sku_code', align: 'center', width: 150 },
			{ title: '购买数量', dataIndex: 'num', align: 'center', width: 150 },
			{ title: '单价(原币)', dataIndex: 'price', align: 'center', width: 150 },
			{ title: '总价(原币)', dataIndex: 'total_price', align: 'center', width: 150 },
		]
	}
}
export class PaymentInformation {
	// 原单支付信息
	data: tableColumnsType
	constructor() {
		this.data = [
			{ title: '交易号', dataIndex: 'plat_customer_id', align: 'center', width: 150 },
			{ title: '状态', dataIndex: 'status_name', align: 'center', width: 150 },
			{ title: '支付方式', dataIndex: 'channel_name', align: 'center', width: 150 },
			{ title: '币种', dataIndex: 'currency', align: 'center', width: 150 },
			{ title: '交易金额', dataIndex: 'money', align: 'center', width: 150 },
			{ title: '支付时间', dataIndex: 'plat_created_time', align: 'center', width: 150 },
		]
	}
}
