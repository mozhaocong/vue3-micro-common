import { FormBasicData, RRangePicker, FormConfig } from '@/components'

export class SearchRow {
	data: FormRowArray
	constructor(searchForm?: any) {
		this.data = [
			{
				title: '采购单检索',
				key: 'no',
				props: {
					// allowClear: false,
					placeholder: '请输入',
					onChange: (value: any) => {
						console.log(searchForm.value.no)
					},
				},
			},
			{
				title: '供应商',
				key: 'supplier_name',
				component: 'a-textarea',
				props: {
					rows: 2,
					placeholder: '请输入供应商',
					// onChange: (value: any) => {
					// 	console.log(searchForm.value.no)
					// },
				},
			},
			{
				title: '采购单状态',
				key: 'status',
				component: <FormConfig />,
				props: {
					placeholder: '请选择',
					prop: 'supplierStatus',
				},
			},
			{
				title: '采购员',
				key: 'user_id',
				component: <FormBasicData />,
				props: {
					placeholder: '请选择',
					prop: 'basicSysUserList',
				},
			},
			{
				title: '创建时间',
				key: 'email',
				component: <RRangePicker />,
				props: {
					placeholder: ['开始时间', '结束时间'],
				},
				keys: [
					['start_time', 'startTime'],
					['end_time', 'endTime'],
				],
			},

			// {
			// 	title: '采购单检索',
			// 	key: 'supplier_name',
			// 	modelValue: 'checked',
			// 	// props: {
			// 	// 	model: 'supplier_name',
			// 	// },
			// 	component: 'a-switch', // 可以指定antd控件
			// 	// customRender: ({ dataSource }) => {
			// 	// 	console.log(dataSource)
			// 	// 	return <a-input placeholder="供应商" v-model={[searchForm.value.supplier_name, 'value']} />
			// 	// },
			// },

			// {
			// 	title: '品牌店铺',
			// 	key: 'category',
			// 	component: <FormConfig />,
			// 	props: {
			// 		prop: 'crmCategory',
			// 	},
			// },
		]
	}
}

export class TableRow {
	data: tableColumnsType
	constructor(operationConfig?: any) {
		this.data = [
			{
				title: '采购单编号',
				dataIndex: 'no',
			},
			{
				title: '参考单号',
				dataIndex: 'reference_no',
			},
			{
				title: '采购员',
				dataIndex: 'user_real_name',
			},
			{
				title: '供应商',
				dataIndex: 'supplier_name',
			},
			{
				title: '采购单状态',
				dataIndex: 'status_name',
			},
			{
				title: '采购总数',
				dataIndex: 'sku_total',
			},
			{
				title: '到货总数',
				dataIndex: 'arrival_sku_total',
			},
			{
				title: '总金额',
				dataIndex: 'total_amount',
			},
			{
				title: '补货方式',
				dataIndex: 'replenish_type_name',
			},
			{
				title: '创建时间',
				dataIndex: 'created_at',
			},
			{
				title: '审核备注',
				dataIndex: 'audit_note',
			},
			{
				title: '多条展示',
				// dataIndex: 'audit_note',
				customRender: ({ text, record }) => {
					console.log(text.value, record.value)
					return <div></div>
				},
			},
		]
	}
}
