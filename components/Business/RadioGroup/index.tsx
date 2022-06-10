import { computed, defineComponent, PropType, markRaw, App, Plugin } from 'vue'
import { configBusinessDataOptions } from '@/config'
import { isArray, isTrue } from '@/utils'
import { map } from 'ramda'
import { Button } from 'ant-design-vue'
const Props = {
	value: [String, Number, Array] as PropType<string | number | any[]>,
	prop: {
		type: String as PropType<string>,
		default: 'status',
	},
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	multiple: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	options: Array as PropType<Options[]>,
	filter: {
		type: Function as PropType<(item: Options) => boolean>,
	},
	isAllButton: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	title: {
		type: String as PropType<string>,
		default: '',
	},
	countList: {
		type: Object as PropType<ObjectMap>,
		default() {
			return {}
		},
	},
} as const
const FormRadioGroup = defineComponent({
	name: 'FormRadioGroup',
	props: Props,
	emits: ['update:label', 'update:value', 'change', 'search'],
	setup(props, { emit }) {
		const computeCount = computed(() => {
			if (isTrue(props.options)) {
				return props.options as Options[]
			}
			const filter = props.filter
			if (filter) {
				return ((configBusinessDataOptions[props.prop] as Options[]) || []).filter(filter)
			} else {
				return configBusinessDataOptions[props.prop] || []
			}
		})

		function buttonClick(item: ObjectMap) {
			let data: string[] | string | number
			if (!props.multiple) {
				data = item.value
			} else {
				if (!isTrue(item.value)) {
					data = ''
				} else if (buttonValue.value.includes(item.value)) {
					data = buttonValue.value.filter((res) => res !== item.value)
				} else {
					data = [...buttonValue.value, item.value]
					data = data.length === computeCount.value.length ? '' : data
				}
			}
			emit('update:value', data)
			emit('change', item)
			emit('search', '')
		}

		const allCount = computed(() => {
			let data = 0
			for (const count in props.countList) {
				data += props.countList[count] * 1
			}
			if (data > 9999) {
				data = 9999
			}
			return statisticsShow(data)
		})

		const buttonValue = computed<any[]>(() => {
			if (isArray(props.value)) {
				const data: any[] = props.value || []
				if (!isTrue(props.value)) {
					return data
				}
				if (!isTrue(computeCount.value.filter((item) => !data.includes(item.value)))) {
					return []
				}
				return props.value
			} else if (isTrue(props.value)) {
				return [props.value]
			} else {
				return []
			}
		})

		function statisticsShow(data: number) {
			if (data > 9999) {
				data = 9999
			}
			return data ? `(${data})` : ''
		}

		return () => {
			return (
				<div>
					{props.title}
					{isTrue(computeCount.value) && props.isAllButton && (
						// <a-badge count={allCount.value} overflowCount={9999}>
						<Button
							style="margin: 0 16px 0 0;"
							disabled={props.disabled}
							onClick={() => {
								buttonClick({ value: '', label: '全部' })
							}}
							type={!isTrue(buttonValue.value) ? 'primary' : 'default'}
						>
							全部{allCount.value}
						</Button>
						// </a-badge>
					)}
					{map(
						(item: ObjectMap) => (
							// <a-badge count={props.countList[item.value] || 0} overflowCount={9999}>
							<Button
								style="margin: 0 16px 0 0;"
								disabled={item.disabled ?? props.disabled}
								type={buttonValue.value.includes(item.value) ? 'primary' : 'default'}
								onClick={() => buttonClick(item)}
							>
								{item.label}
								{statisticsShow(props.countList[item.value] || 0)}
							</Button>
							// </a-badge>
						),
						computeCount.value
					)}
				</div>
			)
		}
	},
})

FormRadioGroup.install = function (app: App) {
	app.component(FormRadioGroup.name, FormRadioGroup)
	return app
}

export default markRaw(FormRadioGroup) as typeof FormRadioGroup & Plugin
