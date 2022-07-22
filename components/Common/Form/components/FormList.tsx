import { defineComponent, markRaw, onMounted, PropType, ref } from 'vue'
import { isFunctionOfOther } from '@/components/Common/utils'
import RFormItem from '@/components/Common/Form/components/FormItem'
import { isTrue } from '@/utils'
import { formItemConfig, formProps, formRulesName, setFormConfig } from '@/components/Common/Form/util'
const Props = {
	model: {
		type: Array as PropType<any[]>,
		required: true,
	},
	header: { type: [String, Function] as PropType<(item: customRenderItem) => any | string> },
	footer: { type: [String, Function] as PropType<(item: customRenderItem) => any | string> },
	list: { type: Array as PropType<Array<FormRow>>, required: true },
	rowKey: Array as PropType<any[]>,
	...formProps,
} as const
const _RFormList = defineComponent({
	name: 'RFormList',
	props: Props,
	setup(props, { slots }) {
		const formRef = ref()
		onMounted(() => {
			if (props.formRef) props.formRef.value = formRef.value
		})
		return () => {
			const dataSource = props.model
			if (!isTrue(dataSource)) {
				return ''
			}
			const itemDom = dataSource.map((item: any, index) => {
				const listRows = props.list.map((res: any) => {
					return { ...res, name: formRulesName(props, res, index) }
				})
				const list = <RFormItem model={item} rows={listRows} v-slots={slots} index={index} {...formItemConfig(props)} />
				return (
					<>
						<div>{isFunctionOfOther(props.header, { record: item, dataSource, index: index })}</div>
						{list}
						<div>{isFunctionOfOther(props.footer, { record: item, dataSource, index: index })}</div>
					</>
				)
			})
			return !isTrue(props.rowKey) ? (
				<a-form ref={formRef} {...setFormConfig(props)}>
					{itemDom}
				</a-form>
			) : (
				itemDom
			)
		}
	},
})

export default markRaw(_RFormList)
