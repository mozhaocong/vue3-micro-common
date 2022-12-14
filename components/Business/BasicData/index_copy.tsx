import { defineComponent, PropType, computed, onMounted, ref, App, markRaw, Plugin } from 'vue'
import { Select } from 'ant-design-vue'
import { filterOption } from '../utils/index'
import { isArray, isTrue } from '@/utils'
import { storeMapping } from '@/store/modules/erp/business/mapping'

const Props = {
	value: [String, Number, Array] as PropType<string | number | Array<any>>,
	label: [String, Number] as PropType<string | number>,
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	prop: {
		type: String as PropType<string>,
		default: 'sysUserList',
		required: true,
	},
	mode: String as PropType<'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE'>,
	placeholder: String as PropType<string>,
	allowClear: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	filter: {
		type: Function as PropType<(item: Array<Options>) => Array<ObjectMap>>,
	},
	showSearch: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	onChange: Function as PropType<(item: ObjectMap) => void>,
	storeName: String as PropType<string>,
	isUppercase: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
}
const FormBasicData = defineComponent({
	name: 'FormBasicData',
	props: Props,
	setup(props, { emit }) {
		const storeModule = ref()
		const storeName = ref('')
		const computeCount = computed(() => {
			const filter = props.filter
			if (!storeModule.value) {
				return []
			}
			if (filter) {
				return filter(storeModule.value[props.prop] as Options[])
			} else {
				return storeModule.value[props.prop]
			}
		})

		function onChange(value: any, option?: any) {
			if (isArray(value)) {
				if (option && isArray(option)) {
					emit(
						'update:label',
						option.map((item: Options) => {
							return item.label
						})
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
		onMounted(() => {
			if (props.storeName) {
				if (storeMapping[props.storeName]) {
					storeModule.value = storeMapping[props.storeName]
				} else {
					console.error(`storeName??? ${props.storeName}, ???storeMapping???????????????`)
					return false
				}
			} else {
				for (const i in storeMapping) {
					if (storeMapping[i][props.prop]) {
						storeName.value = i
						storeModule.value = storeMapping[i]
						break
					}
				}
			}
			if (isTrue(storeModule.value)) {
				if (!isTrue(storeModule.value[props.prop])) {
					storeModule.value.getBasicDataList({ type: props.prop as string })
				}
			} else {
				console.error(`${props.storeName}, ???vux ?????????`)
			}
		})

		return () => (
			<Select
				onChange={onChange}
				mode={props.mode}
				disabled={props.disabled}
				allowClear={props.allowClear}
				value={props.value}
				placeholder={props.placeholder}
				options={computeCount.value}
				showSearch={props.showSearch}
				getPopupContainer={(triggerNode) => triggerNode.parentNode}
				filterOption={(inputValue: string, option: any) => filterOption(inputValue, option, props.isUppercase)}
			/>
		)
	},
})

FormBasicData.install = function (app: App) {
	app.component(FormBasicData.name, FormBasicData)
	return app
}

export default markRaw(FormBasicData) as typeof FormBasicData & Plugin
