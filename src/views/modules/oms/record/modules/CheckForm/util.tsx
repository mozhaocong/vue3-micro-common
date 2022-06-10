export class SearchRowShip {
	data: FormRowArray
	constructor() {
		this.data = [
			{ title: '退货记录编号', key: 'plat_no' },
			{ title: '退货单ID', key: 'plat_id' },
			{ title: '登记时间', key: 'shipping_created_time' },
			{ title: '退货进度', key: 'status_name' },
			{ title: '物流', key: 'shipping_name' },
			{ title: '运单号', key: 'shipping_no' },
		]
	}
}

export class TableRowShip {
	data: tableColumnsType
	constructor() {
		this.data = [
			{
				title: '产品SKU',
				dataIndex: 'reference_no',
				align: 'center',
				width: 50,
				// customRender: () => {
				// 	return '1'
				// },
			},
			{ title: '退货数量', dataIndex: 'num', align: 'center', width: 50 },
			{ title: '退货理由标签', dataIndex: 'product_reason', align: 'center', width: 50 },
		]
	}
}
