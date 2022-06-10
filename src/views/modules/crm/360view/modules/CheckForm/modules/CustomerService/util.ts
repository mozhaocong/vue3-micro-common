/* eslint-disable */
export class TableRow {
	data: tableColumnsType
	constructor() {
		this.data = [
			{
				title: 'ID',
				dataIndex: 'null1',
				align: 'center',
				width: 150,
				customRender: () => {
					return '1'
				},
			},
			{
				title: '咨询问题类型',
				dataIndex: 'null2',
				align: 'center',
				width: 150,
				customRender: () => {
					return ''
				},
			},
			{ title: '问题描述', dataIndex: 'null3', align: 'center', width: 150 },
			{ title: '关联订单', dataIndex: 'null4', align: 'center', width: 150 },
			{ title: '服务单状态', dataIndex: 'null5', align: 'center', width: 150 },
			{ title: '最后跟进人', dataIndex: 'null6', align: 'center', width: 150 },
			{ title: '咨询时间', dataIndex: 'null7', align: 'center', width: 150 },
			{ title: '完成时间', dataIndex: 'null8', align: 'center', width: 150 },
		]
	}
}
/* eslint-enable */
