import { computed, defineComponent, PropType, markRaw, App, Plugin } from 'vue'
import { configBusinessDataOptions } from '@/config'
import { isArray } from '@/utils'
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
		required: true,
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
} as const
const FormConfig = defineComponent({
	name: 'FormConfig',
	props: Props,
	emits: ['update:label', 'update:value'],
	setup(props, { emit }) {
		const computeCount = computed(() => {
			const filter = props.filter
			if (filter) {
				return (configBusinessDataOptions[props.prop] as Options[]).filter(filter)
			} else {
				return configBusinessDataOptions[props.prop]
			}
		})

		function onChange(value: any, option?: any) {
			if (isArray(value)) {
				if (option && isArray(option)) {
					emit(
						'update:label',
						map((item: Options) => {
							return item.label
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
					emit('update:value', (option as Options).value)
					emit('update:label', (option as Options).label)
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
			const def = isNaN(Number(props.value)) ? props.value : Number(props.value)
			return (
				<Select
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
