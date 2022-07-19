import { valueFormat } from '@/config'
import dayjs from 'dayjs'
import { FormConfig, RRangePicker } from '@/components'

export const searchModelDefData = {
	created_start_time: dayjs().format(valueFormat),
	created_end_time: dayjs().subtract(1, 'M').format(valueFormat),
	is_simple: 1,
}

export const searchDefRow: any = [
	{
		title: '创建时间',
		key: 'created_start_time',
		component: <RRangePicker />,
		props: {
			showTime: true,
		},
		keys: [
			['created_start_time', 'startTime'],
			['created_end_time', 'endTime'],
		],
	},
	{
		title: '是否简化查询',
		key: 'is_simple',
		component: <FormConfig />,
		props: {
			placeholder: '默认简化查询',
			prop: 'baseYesNoStatus',
		},
	},
]
