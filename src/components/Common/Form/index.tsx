/*
 * 系统订单表单填写校验组件
 * @Author: mzc
 * @Date: 2021-08-20 15:30
 */
import { PropType, ref, defineComponent, renderSlot, onMounted, App, Plugin, markRaw } from 'vue'
import RFormItem from './components/FormItem'
import { formItemConfig, formProps, setFormConfig } from '@/components/Common/Form/util'
import { Form } from 'ant-design-vue'

const Props = {
	model: {
		type: Object as PropType<ObjectMap>,
		required: true,
	},
	rows: {
		type: Array as PropType<FormRowArray>,
		required: true,
	},
	...formProps,
} as const
const _Form = defineComponent({
	name: 'RForm',
	props: Props,
	setup(props, { slots }) {
		const formRef = ref()
		onMounted(() => {
			if (props.formRef) props.formRef.value = formRef.value
		})

		return () => {
			return (
				<div>
					{renderSlot(slots, 'header')}
					<div>
						<Form
							ref={formRef}
							// layout="horizontal"
							// id={props.fid}
							// model={props.model}
							// rules={props.rules}
							// labelCol={props.labelCol}
							// wrapperCol={props.wrapperCol}
							// onFinish={() => {
							// 	if (props.finish) {
							// 		props.finish(clone(props.model))
							// 	}
							// }}
							// onFinishFailed={props.finishFailed}
							{...setFormConfig(props)}
						>
							<RFormItem
								formItemStyle={props.formItemStyle}
								model={props.model}
								rows={props.rows}
								v-slots={slots}
								{...formItemConfig(props)}
							/>
						</Form>
					</div>

					{renderSlot(slots, 'footer')}
				</div>
			)
		}
	},
})

_Form.install = function (app: App) {
	app.component(_Form.name, _Form)
	return app
}

export default markRaw(_Form) as typeof _Form & Plugin
