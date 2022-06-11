import { configCurryFilter } from '@/utils'
import { FormBasicData, RRangePicker } from '@/components'

export class SearchRow {
	data: FormRowArray
	constructor(searchForm: ObjectMap) {
		this.data = [
			{
				title: '采购单检索',
				key: 'no',
				component: 'a-input',
				props: {
					onChange: () => {
						searchForm.value['no1'] = searchForm.value.no
					},
				},
			},
			{
				title: '采购单检索1',
				key: 'no1',
				component: 'a-input',
				// props: {
				// 	prop: 'sysUserList',
				// 	...defaultRowProps,
				// },
			},
			{
				title: '所有人',
				key: 'no3',
				component: <FormBasicData />,
				props: {
					prop: 'basicSysUserList',
				},
			},
			// {
			// 	title: '时间选择',
			// 	key: 'asgasga',
			// 	slotName: 'spPlatform1',
			// },
			// {
			// 	title: '创建人222',
			// 	key: 'createBy',
			// 	slotName: 'createBy',
			// },
			{
				title: '出库时间11111111',
				key: 'pickerTimeA',
				colProps: { flex: '600px' },
				component: <RRangePicker />,
				keys: [
					['pickerTimeA', 'startTime'],
					['pickerTimeB', 'endTime'],
				],
			},
			{
				title: '采购单检索22',
				key: 'no5',
				component: 'a-input',
			},
			{
				title: '采购单检索23',
				key: 'no6',
				component: 'a-input',
			},
			{
				title: '采购单检索24',
				key: 'no7',
				component: 'a-input',
			},
		]
	}
}

export class TableRow {
	data: tableColumnsType
	constructor(operationClick?: any) {
		this.data = [
			{ title: 'asna', dataIndex: 'null1', align: 'center', width: 300 },
			{ title: 'asyhfk,', dataIndex: 'null2', align: 'center', width: 300 },
			{ title: 'euyru,', dataIndex: 'null3', align: 'center', width: 300 },
			{ title: 'kfgk', dataIndex: 'null4', align: 'center', width: 300 },
			{ title: 'reure', dataIndex: 'null5', align: 'center', width: 300 },
			{ title: 'fjfdn', dataIndex: 'null6', align: 'center', width: 300 },
			{ title: 'hgret', dataIndex: 'null7', align: 'center', width: 300 },
			{ title: 'dndm', dataIndex: 'null8', align: 'center', width: 150 },
			{ title: 'dferteyw', dataIndex: 'null9', align: 'center', width: 300 },
		]
	}
}

export const dataSource = [
	{ null0: 1, null1: 2, null2: 3, null3: 4, null4: 5, null5: 6, null6: 7, null7: 8, null8: 9, null9: 10 },
	{ null0: 11, null1: 12, null2: 13, null3: 14, null4: 15, null5: 16, null6: 17, null7: 18, null8: 19, null9: 20 },
	{ null0: 21, null1: 22, null2: 23, null3: 24, null4: 25, null5: 26, null6: 27, null7: 28, null8: 29, null9: 30 },
	{ null0: 31, null1: 32, null2: 33, null3: 34, null4: 35, null5: 36, null6: 37, null7: 38, null8: 39, null9: 40 },
	{ null0: 41, null1: 42, null2: 43, null3: 44, null4: 45, null5: 46, null6: 47, null7: 48, null8: 49, null9: 50 },
	{ null0: 51, null1: 52, null2: 53, null3: 54, null4: 55, null5: 56, null6: 57, null7: 58, null8: 59, null9: 60 },
	{ null0: 61, null1: 62, null2: 63, null3: 64, null4: 65, null5: 66, null6: 67, null7: 68, null8: 69, null9: 70 },
	{ null0: 71, null1: 72, null2: 73, null3: 74, null4: 75, null5: 76, null6: 77, null7: 78, null8: 79, null9: 80 },
	{ null0: 81, null1: 82, null2: 83, null3: 84, null4: 85, null5: 86, null6: 87, null7: 88, null8: 89, null9: 90 },
	{ null0: 91, null1: 92, null2: 93, null3: 94, null4: 95, null5: 96, null6: 97, null7: 98, null8: 99, null9: 100 },
	{ null0: 1, null1: 2, null2: 3, null3: 4, null4: 5, null5: 6, null6: 7, null7: 8, null8: 9, null9: 10 },
	{ null0: 11, null1: 12, null2: 13, null3: 14, null4: 15, null5: 16, null6: 17, null7: 18, null8: 19, null9: 20 },
	{ null0: 21, null1: 22, null2: 23, null3: 24, null4: 25, null5: 26, null6: 27, null7: 28, null8: 29, null9: 30 },
	{ null0: 31, null1: 32, null2: 33, null3: 34, null4: 35, null5: 36, null6: 37, null7: 38, null8: 39, null9: 40 },
	{ null0: 41, null1: 42, null2: 43, null3: 44, null4: 45, null5: 46, null6: 47, null7: 48, null8: 49, null9: 50 },
	{ null0: 51, null1: 52, null2: 53, null3: 54, null4: 55, null5: 56, null6: 57, null7: 58, null8: 59, null9: 60 },
	{ null0: 61, null1: 62, null2: 63, null3: 64, null4: 65, null5: 66, null6: 67, null7: 68, null8: 69, null9: 70 },
	{ null0: 71, null1: 72, null2: 73, null3: 74, null4: 75, null5: 76, null6: 77, null7: 78, null8: 79, null9: 80 },
	{ null0: 81, null1: 82, null2: 83, null3: 84, null4: 85, null5: 86, null6: 87, null7: 88, null8: 89, null9: 90 },
	{ null0: 91, null1: 92, null2: 93, null3: 94, null4: 95, null5: 96, null6: 97, null7: 98, null8: 99, null9: 100 },
	{ null0: 1, null1: 2, null2: 3, null3: 4, null4: 5, null5: 6, null6: 7, null7: 8, null8: 9, null9: 10 },
	{ null0: 11, null1: 12, null2: 13, null3: 14, null4: 15, null5: 16, null6: 17, null7: 18, null8: 19, null9: 20 },
	{ null0: 21, null1: 22, null2: 23, null3: 24, null4: 25, null5: 26, null6: 27, null7: 28, null8: 29, null9: 30 },
	{ null0: 31, null1: 32, null2: 33, null3: 34, null4: 35, null5: 36, null6: 37, null7: 38, null8: 39, null9: 40 },
	{ null0: 41, null1: 42, null2: 43, null3: 44, null4: 45, null5: 46, null6: 47, null7: 48, null8: 49, null9: 50 },
	{ null0: 51, null1: 52, null2: 53, null3: 54, null4: 55, null5: 56, null6: 57, null7: 58, null8: 59, null9: 60 },
	{ null0: 61, null1: 62, null2: 63, null3: 64, null4: 65, null5: 66, null6: 67, null7: 68, null8: 69, null9: 70 },
	{ null0: 71, null1: 72, null2: 73, null3: 74, null4: 75, null5: 76, null6: 77, null7: 78, null8: 79, null9: 80 },
	{ null0: 81, null1: 82, null2: 83, null3: 84, null4: 85, null5: 86, null6: 87, null7: 88, null8: 89, null9: 90 },
	{ null0: 91, null1: 92, null2: 93, null3: 94, null4: 95, null5: 96, null6: 97, null7: 98, null8: 99, null9: 100 },
]
