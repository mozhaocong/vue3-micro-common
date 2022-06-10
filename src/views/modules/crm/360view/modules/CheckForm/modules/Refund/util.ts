/* eslint-disable */
export class TableRow {
	data: tableColumnsType
	constructor(operationConfig?: any) {
		this.data = [
			{title: '退款类型',dataIndex: 'method_name',align: 'center',width: 150,},
			{ title: '订单号', dataIndex: ['service_order','order_no'], align: 'center', width: 150 },
			{
				title: '退款状态',
				dataIndex: 'status_name',
				align: 'center',
				width: 150,
				// customRender: () => {
				// 	return ''
				// },
			},
			// { title: '创建人', dataIndex: 'null6', align: 'center', width: 150 },
			{ title: '创建时间', dataIndex: 'created_at', align: 'center', width: 150 },
		]
	}
}
/* eslint-enable */
