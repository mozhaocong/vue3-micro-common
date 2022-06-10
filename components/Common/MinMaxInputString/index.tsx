import { App, defineComponent, markRaw, Plugin, PropType } from 'vue'
import { InputNumber, Form } from 'ant-design-vue'
import { isTrue } from '@/utils'
const propsData = {
	value: {
		type: String as PropType<string>,
	},
} as const
const _MinMaxInput = defineComponent({
	props: propsData,
	name: 'MinMaxInput',
	emits: ['update:value', 'update:maxValue', 'update:minValue', 'onChange'],
	setup(props, { emit }) {
		const formItemContext = Form.useInjectFormItemContext()

		function getMimMax() {
			const { value = '' } = props || {}
			let minValue = ''
			let maxValue = ''
			if (!isTrue(value)) {
				return { minValue, maxValue }
			}
			const data = value.split(',')
			minValue = data[0]
			maxValue = data[1]
			return { minValue, maxValue }
		}

		function onChange(value: any, type: any) {
			const { minValue, maxValue } = getMimMax()
			const data = {
				minValue,
				maxValue,
				[type]: value,
			}
			const returnData = (data.minValue || '') + ',' + data.maxValue || ''
			emit('update:value', returnData)
			formItemContext.onFieldChange()
		}

		function onBlur() {
			const { minValue, maxValue } = getMimMax()
			if (isTrue(minValue) && isTrue(maxValue)) {
				if ((minValue as any) * 1 > (maxValue as any) * 1) {
					const data = {
						minValue: maxValue,
						maxValue: minValue,
					}
					const returnData = (data.minValue || '') + ',' + (data.maxValue || '')
					console.log(returnData)
					emit('update:value', returnData)
					formItemContext.onFieldChange()
				}
			}
		}

		return () => {
			const { minValue, maxValue } = getMimMax()
			return (
				<div>
					<InputNumber
						onBlur={onBlur}
						value={minValue}
						onChange={(e) => {
							onChange(e, 'minValue')
						}}
					/>
					-
					<InputNumber
						onBlur={onBlur}
						value={maxValue}
						onChange={(e) => {
							onChange(e, 'maxValue')
						}}
					/>
				</div>
			)
		}
	},
})
_MinMaxInput.install = function (app: App) {
	app.component(_MinMaxInput.name, _MinMaxInput)
	return app
}

export default markRaw(_MinMaxInput) as typeof _MinMaxInput & Plugin
