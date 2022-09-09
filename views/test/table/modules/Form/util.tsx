import { FormConfig } from '@/components'

export class FormRow {
	data: FormRowArray
	constructor() {
		this.data = [
			{
				title: '供应商',
				key: 'no',
				component: 'a-input',
				rules: [{ required: true, message: '期望收款日期不能为空', trigger: 'change' }],
			},
			{
				title: '补货方式',
				key: 'no1',
				component: 'a-input',
			},
			{
				title: '是否补货',
				key: 'no2',
				component: <FormConfig />,
				props: {
					prop: 'baseYesNoStatus',
				},
			},
		]
	}
}
