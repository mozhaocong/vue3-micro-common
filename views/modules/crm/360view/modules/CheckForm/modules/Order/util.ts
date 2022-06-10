/* eslint-disable */
export class TableRow {
	data: tableColumnsType
	constructor(operationConfig?: any) {
		this.data = [
			{
				title: '订单编号',
				dataIndex: 'no',
				align: 'center',
				width: 150,
				// customRender: () => {
				// 	return '1'
				// },
			},
			{ title: '原单号', dataIndex: 'reference_no', align: 'center', width: 150 },
			{ title: '收件人姓名', dataIndex: 'contact_name', align: 'center', width: 150 },
			{ title: '订单状态', dataIndex: 'status_name', align: 'center', width: 150 },
			{ title: '订单总金额', dataIndex: 'total_price', align: 'center', width: 150 },
			{ title: '商品总金额', dataIndex: 'total_items_price', align: 'center', width: 150 },
			{ title: '优惠卷金额', dataIndex: 'total_discount_price', align: 'center', width: 150 },
			{ title: '礼品卡金额', dataIndex: 'total_gift_price', align: 'center', width: 150 },
			{ title: '积分抵扣金额', dataIndex: 'total_point_price', align: 'center', width: 150 },
			{ title: 'vip 优惠金额', dataIndex: 'total_vip_price', align: 'center', width: 150 },
			{ title: '下单时间', dataIndex: 'plat_created_time', align: 'center', width: 150 },
		]
	}
}
/* eslint-enable */
