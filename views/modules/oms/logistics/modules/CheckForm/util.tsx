export class SearchRowShip {
	data: FormRowArray
	constructor() {
		this.data = [
			{ title: '运单号.', key: 'shipping_no' },
			{ title: '类型', key: '' },
			{ title: '物流商', key: 'shipper_name' },
			{ title: '派送方式', key: 'shipper_method_name' },
			{ title: '订单编号', key: ['out_repo_order', 'no'] },
			{ title: '客户名称', key: 'consignee_person_name' },
			{ title: '实际重量', key: ['out_repo_order', 'real_weight'] },
			{ title: '实际运费', key: ['out_repo_order', 'freight_price_usd'] },
			{ title: '创建时间', key: 'shipping_created_time' },
			{ title: '上网时间', key: 'online_time' },
			{ title: '发货时间', key: ['out_repo_order', 'deliveried_completed_time'] },
			{ title: '签收时间', key: 'sign_time' },
			{ title: '发货时效', key: 'delivery_day' },
			{ title: '签收时效', key: 'transit_day' },
			{
				title: '面单',
				key: 'shipping_no_image',
				customRender: ({ record }) => {
					return <div>{record}</div>
				},
			},
			{
				title: '发票',
				key: 'invoice_no_image',
				customRender: ({ record }) => {
					return <div>{record}</div>
				},
			},
		]
	}
}

export class TableRowShip {
	data: tableColumnsType
	constructor() {
		this.data = [
			{
				title: '时间',
				dataIndex: 'null1',
				align: 'center',
				width: 50,
				// customRender: () => {
				// 	return '1'
				// },
			},
			{ title: '轨迹', dataIndex: 'null3', align: 'center', width: 50 },
		]
	}
}
