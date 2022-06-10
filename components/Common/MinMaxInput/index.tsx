import { App, defineComponent, markRaw, Plugin, PropType } from 'vue'
import { InputNumber, Form } from 'ant-design-vue'
import { isTrue } from '@/utils'
const propsData = {
	value: {
		type: Object as PropType<ObjectMap>,
	},
	minValue: Number as PropType<number>,
	maxValue: Number as PropType<number>,
} as const
const _MinMaxInput = defineComponent({
	props: propsData,
	name: 'MinMaxInput',
	emits: ['update:value', 'update:maxValue', 'update:minValue', 'onChange'],
	setup(props, { emit }) {
		const formItemContext = Form.useInjectFormItemContext()

		function getMimMax() {
			let { minValue, maxValue } = props.value || {}
			minValue = props.minValue ?? minValue
			maxValue = props.maxValue ?? maxValue
			return { minValue, maxValue }
		}

		function onChange(value: any, type: any) {
			const { minValue, maxValue } = getMimMax()
			const data = {
				minValue,
				maxValue,
				[type]: value,
			}
			emit('update:value', data)
			emit('update:minValue', data.minValue)
			emit('update:maxValue', data.maxValue)
			formItemContext.onFieldChange()
		}

		function onBlur() {
			const { minValue, maxValue } = getMimMax()
			if (isTrue(minValue) && isTrue(maxValue)) {
				if (minValue > maxValue) {
					emit('update:value', { maxValue: minValue, minValue: maxValue })
					emit('update:minValue', maxValue)
					emit('update:maxValue', minValue)
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
