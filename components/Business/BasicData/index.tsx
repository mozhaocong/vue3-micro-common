import { defineComponent, PropType, computed, onMounted, ref, App, markRaw, Plugin } from 'vue'
import { Select } from 'ant-design-vue'
import { filterOption } from '../utils/index'
import { isArray, isTrue } from '@/utils'
import { storeMapping } from '@/store/modules/erp/business/mapping'
import { useStore } from 'vuex'

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

const storeNameMap: ObjectMap = {
	basicData: 'basicData',
}
const FormBasicData = defineComponent({
	name: 'FormBasicData',
	props: Props,
	setup(props, { emit }) {
		const { state, dispatch } = useStore()
		const storeModelName = ref('')
		const computeCount = computed(() => {
			const filter = props.filter
			if (!isTrue(storeModelName.value)) {
				return []
			}
			if (filter) {
				return filter(state[storeModelName.value][props.prop] as Options[])
			} else {
				return state[storeModelName.value][props.prop] || []
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
			console.log('onMounted onMounted onMounted')
			if (props.storeName) {
				const storeMappingData = storeNameMap[props.storeName]
				if (storeMappingData) {
					if (state[storeMappingData] && state[storeMappingData][props.prop]) {
						storeModelName.value = storeMappingData
					} else {
						console.error(`storeName： ${props.storeName}, 在storeMapping映射没有对应的值`)
					}
				} else {
					console.error(`storeName： ${props.storeName}, 在storeName映射找不到`)
					return false
				}
			} else {
				for (const i in storeNameMap) {
					if (state[storeNameMap[i]]) {
						const stateStoreMappingData = state[storeNameMap[i]]
						if (stateStoreMappingData[props.prop]) {
							storeModelName.value = storeNameMap[i]
							break
						}
					}
				}
			}

			if (isTrue(storeModelName.value)) {
				if (!isTrue(state[storeModelName.value][props.prop])) {
					dispatch(`${storeModelName.value}/getBasicDataList`, { type: props.prop as string })
				}
			} else {
				console.error(`${props.storeName}, 在vux 找不到`)
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
