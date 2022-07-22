import { defineComponent, h, markRaw, PropType, renderSlot, resolveComponent } from 'vue'
import { isArray, isString, isTrue } from '@/utils'
import { last } from 'ramda'
import { isFunctionOfOther } from '@/components/Common/utils'
import { Col, FormItem, Row } from 'ant-design-vue'

const Props = {
	model: {
		type: Object as PropType<ObjectMap>,
		required: true,
	},
	rowProps: {
		type: Object as PropType<ObjectMap>,
		default() {
			return {}
		},
	},
	customRender: Function as PropType<(item: { text: any; record: ObjectMap }) => void>,
	component: null,
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	rows: {
		type: Array as PropType<FormRowArray>,
		required: true,
	},
	index: { type: Number as PropType<number>, default: 0 },
	colSpan: [Number, String] as PropType<number | ''>,
	formItemStyle: Object as PropType<ObjectMap>,
} as const
const _FormItem = defineComponent({
	name: 'RFormItem',
	props: Props,
	setup(props, { slots }) {
		function renderRowProps(data: any, row: ObjectMap) {
			let returnData = {}
			if (isTrue(data)) {
				returnData = isFunctionOfOther(data, { record: row, dataSource: props.model })
			}
			return { ...(props?.rowProps || {}), disabled: props.disabled, ...returnData }
		}

		function itemDom(row: ObjectMap) {
			if (row.customRender) {
				return row.customRender({ text: getFormName(props.model, row.key), record: props.model, index: props.index })
			} else if (row.component) {
				return itemH(isString(row.component) ? resolveComponent(row.component) : row.component, row)
			} else if (props.customRender) {
				return props.customRender({ text: getFormName(props.model, row.key), record: props.model })
			} else if (props.component) {
				return itemH(isString(props.component) ? resolveComponent(props.component) : props.component, row)
			} else {
				return itemH(resolveComponent('a-input'), row)
			}
		}
		/* eslint-disable */
    function itemH(component: any, row: ObjectMap) {
      return h(component, {
        getPopupContainer: (triggerNode: any) => triggerNode.parentNode, // a-select 显示问题
        ...renderRowProps(row.props, row),
        ...valueProps(row),
      })
    }
    /* eslint-enable */

		function valueProps(row: any) {
			let data = {}
			if (row.keys) {
				row.keys.forEach((res: string[]) => {
					const keysObj = {
						// [res[1] ?? 'value']: props.model[res[0]],
						[res[1] ?? 'value']: getFormName(props.model, res[0]),
						// [`onUpdate:${res[1] ?? 'value'}`]: ($event: string | ObjectMap | number) => (props.model[res[0]] = $event),
						[`onUpdate:${res[1] ?? 'value'}`]: ($event: string | ObjectMap | number) =>
							setForName(props.model, res[0], $event),
					}
					data = {
						...data,
						...keysObj,
					}
				})
			} else {
				data = {
					// [row.modelValue ?? 'value']: props.model[row.key],
					[row.modelValue ?? 'value']: getFormName(props.model, row.key),
					[`onUpdate:${row.modelValue ?? 'value'}`]: ($event: string | ObjectMap | number) => {
						setForName(props.model, row.key, $event)
					},
					// (props.model[row.key] = $event), //key = id , props.model = customerManagementDetail.id = $event
				}
			}
			return data
		}

		function setForName(mode: ObjectMap, name: string | Array<string | number>, value: string | ObjectMap | number) {
			if (isString(name)) {
				mode[name] = value
			} else if (isArray(name)) {
				const lastName = last<string>(name) as string
				let data: ObjectMap = mode
				name.forEach((item, index) => {
					if (item === lastName) {
						data[lastName] = value
						return
					}
					if (!isTrue(data[item])) {
						if (isString(name[index + 1])) {
							data[item] = {}
						} else {
							data[item] = []
						}
					}
					data = data[item]
				})
			}
		}

		function getFormName(mode: ObjectMap, name: string | string[]) {
			if (isString(name)) {
				return mode[name]
			} else if (isArray(name)) {
				let data = mode
				for (const item of name) {
					if (!isTrue(data[item])) return undefined
					data = data[item]
				}
				return data
			}
			return undefined
		}

		// function hasFormName(mode: ObjectMap, name: string | string[]) {
		// 	if (isString(name)) {
		// 		// return has(name, mode)
		// 		return true
		// 	} else if (isArray(name)) {
		// 		let data = mode
		// 		for (const item of name) {
		// 			if (!has(item, data)) return false
		// 			data = data[item]
		// 		}
		// 		return true
		// 	}
		// }

		return () => (
			<Row>
				{props.rows.map((row, index) => {
					if (!isTrue(row)) return
					return isFunctionOfOther(row.display, { record: row, dataSource: props.model, index: index }) === false ? (
						''
					) : (
						<Col {...(row.colProps || { span: props.colSpan ?? 6 })} key={row.key as string}>
							{row.render ? (
								isFunctionOfOther(row.render, { record: row, dataSource: props.model, index: index })
							) : row.slotName && slots[row.slotName] ? (
								renderSlot(slots, row.slotName)
							) : (
								<FormItem
									label={row.title}
									// key为数组时，mode没有对应的参数，组件会提示但不影响功能
									name={row.name ?? row.key}
									//有问题 第一次输入校验不了 第一次后就正常
									// name={hasFormName(props.model, row.key) ? row.key : 'null' + index}
									{...{ style: props.formItemStyle ?? {}, ...(row.formItemProps || {}), rules: row.rules ?? [] }}
								>
									{itemDom(row)}
								</FormItem>
							)}
						</Col>
					)
				})}
			</Row>
		)
	},
})

export default markRaw(_FormItem)
