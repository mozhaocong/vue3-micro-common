import { RRangePicker } from '@/components'
import { Button } from 'ant-design-vue'

export class SearchRow {
	data: FormRowArray
	constructor(searchForm: ObjectMap) {
		this.data = [
			{
				title: '输入框',
				key: 'null1',
				props: {
					placeholder: '请输入',
				},
			},
			{ title: '产品检索', key: 'null2' },
			{ title: '产品状态', key: 'null3' },
			{ title: '产品属性', key: 'null4' },
			{
				title: '日期',
				key: 'start_produce_at',
				component: <RRangePicker />,
				props: {
					placeholder: ['起止开始时间', '起止结束时间'],
				},
				keys: [
					['start_produce_at', 'startTime'],
					['end_produce_at', 'endTime'],
				],
			},
		]
	}
}

export class TableRow {
	data: tableColumnsType
	constructor(operationClick?: any) {
		this.data = [
			{ title: 'SKU', dataIndex: 'null1', align: 'center', width: 150 },
			{ title: '产品品类', dataIndex: 'null2', align: 'center', width: 150 },
			{ title: '中文名称', dataIndex: 'null3', align: 'center', width: 150 },
			{ title: '产品状态', dataIndex: 'null4', align: 'center', width: 150 },
			{ title: '是否组合产品', dataIndex: 'null5', align: 'center', width: 150 },
			{ title: '是否质检', dataIndex: 'null6', align: 'center', width: 150 },
			{ title: '创建时间', dataIndex: 'null7', align: 'center', width: 150 },
			{
				title: '操作',
				dataIndex: 'null8',
				align: 'center',
				width: 150,
				customRender: ({ text }) => {
					return (
						<div>
							<Button
								type="primary"
								onClick={() => {
									operationClick.setModuleData({
										record: text,
									})
									// operationConfig.setModuleState({ checkForm: true })
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
