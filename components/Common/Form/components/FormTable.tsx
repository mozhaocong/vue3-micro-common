import { defineComponent, PropType } from 'vue'
import { Form, Table } from 'ant-design-vue'
import { isTrue } from '@/utils'
import RFormItem from '@/components/Common/Form/components/FormItem'
import { formItemConfig, formProps, formRulesName, setFormConfig } from '@/components/Common/Form/util'
const Props = {
	model: {
		type: Array as PropType<any[]>,
		required: true,
	},
	columns: {
		type: Array as PropType<formTableColumnsType>,
		required: true,
	},
	rowKey: Array as PropType<any[]>,
	pagination: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	...formProps,
} as const
export default defineComponent({
	props: Props,
	setup(props, { slots }) {
		return () => {
			const columnsList = props.columns.map((item: any) => {
				const data: ObjectMap = {}
				if (!item.customRender && isTrue(item.row)) {
					data.customRender = ({ record, index }: any) => {
						const listRows = item.row.map((res: any) => {
							return {
								colProps: { span: 24 },
								formItemProps: {
									wrapperCol: { span: 24 },
									labelCol: { span: 0 },
								},
								...res,
								name: formRulesName(props, res, index),
							}
						})
						return <RFormItem model={record} rows={listRows} v-slots={slots} {...formItemConfig(props)} />
					}
				}
				return { ...item, ...data }
			})
			const table = <Table pagination={props.pagination as any} dataSource={props.model} columns={columnsList} />
			return !isTrue(props.rowKey) ? (
				<Form model={props.model} {...setFormConfig(props)}>
					{table}
				</Form>
			) : (
				table
			)
		}
	},
})
