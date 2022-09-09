import { computed, defineComponent, PropType, markRaw, App, Plugin } from 'vue'
import { configBusinessDataOptions } from '@/config'
import { isArray, isTrue } from '@/utils'
import { map } from 'ramda'
import { Select } from 'ant-design-vue'
// import { isTrue } from 'rantion-tools/es'
const Props = {
	value: [String, Number, Array] as PropType<string | number | Array<any>>,
	label: [String, Number] as PropType<string | number>,
	// @Prop(String) readonly prop!: string,
	prop: {
		type: String as PropType<string>,
		default: 'status',
	},
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	mode: String as PropType<'multiple' | 'tags' | 'combobox' | undefined>,
	placeholder: String as PropType<string>,
	allowClear: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	filter: {
		type: Function as PropType<(item: Options) => boolean>,
	},
	onChange: Function as PropType<(item: ObjectMap) => void>,
	options: Array as PropType<Array<ObjectMap>>,
	fieldNames: {
		type: Object as PropType<ObjectMap>,
		default() {
			return { label: 'label', value: 'value', options: 'options' }
		},
	},
	// valueIsNumber: {
	// 	type: Boolean as PropType<boolean>,
	// 	default: true,
	// },
} as const
const FormConfig = defineComponent({
	name: 'FormConfig',
	props: Props,
	emits: ['update:label', 'update:value'],
	setup(props, { emit, attrs }) {
		const computeCount = computed(() => {
			const filter = props.filter
			const data = (props.options ?? configBusinessDataOptions[props.prop]) || []
			if (filter) {
				return (data as Options[]).filter(filter)
			} else {
				return data
			}
		})

		function onChange(value: any, option?: any) {
			if (isArray(value)) {
				if (option && isArray(option)) {
					emit(
						'update:label',
						map((item: Options) => {
							// @ts-ignore
							return item[props?.fieldNames?.label as any] || ''
						}, option)
					)
				} else {
					emit('update:label', undefined)
				}
				if (value.length) {
					emit('update:value', value)
				} else {
					emit('update:value', undefined)
				}
			} else {
				if (option && !isArray(option)) {
					// @ts-ignore
					emit('update:value', (option as Options)[props?.fieldNames?.value as any])
					// @ts-ignore
					emit('update:label', (option as Options)[props?.fieldNames?.label as any])
				} else {
					emit('update:value', undefined)
					emit('update:label', undefined)
				}
			}
			if (props.onChange) {
				props.onChange({ value: value, option: option })
			}
		}

		return () => {
			let def = props.value
			if (!isTrue(props.options)) {
				def = isNaN(Number(props.value)) ? props.value : Number(props.value)
			}
			return (
				<Select
					{...attrs}
					filterOption={(inputValue, option: any) => {
						const label = option[props?.fieldNames?.label] + '' || ''
						const value = option[props?.fieldNames?.value] + '' || ''
						return label.includes(inputValue + '') || value.includes(inputValue + '')
					}}
					fieldNames={props.fieldNames}
					onChange={onChange}
					mode={props.mode as undefined}
					disabled={props.disabled}
					allowClear={props.allowClear}
					value={def}
					placeholder={props.placeholder}
					options={computeCount.value}
					getPopupContainer={(triggerNode) => triggerNode.parentNode}
				/>
			)
		}
	},
})

FormConfig.install = function (app: App) {
	app.component(FormConfig.name, FormConfig)
	return app
}

export default markRaw(FormConfig) as typeof FormConfig & Plugin
