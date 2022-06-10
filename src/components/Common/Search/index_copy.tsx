import { App, defineComponent, h, Plugin, PropType, ref, renderSlot, resolveComponent, watch } from 'vue'
import { DownOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { Col, Row } from 'ant-design-vue'
import { clone, is } from 'ramda'
import { isString } from './tools'
import Rconfigure from '../Configure'
import { deepClone, isTrue } from '@/utils'
import { columnsSetArrayDiffArray, setCustomRow } from '@/components/Common/utils'

const Props = {
	labelCol: {
		type: Object as PropType<LabelCol>,
		default: () => {
			return { span: 6 }
		},
	},
	wrapperCol: {
		type: Object as PropType<LabelCol>,
		default: () => {
			return { span: 16 }
		},
	},
	model: {
		type: Object as PropType<ObjectMap>,
		required: true,
	},
	layout: {
		type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
		default: 'horizontal',
	},
	rows: {
		type: Array as PropType<SearchRow[]>,
		required: true,
	},
	expand: Object as PropType<{
		expandToggle: () => void
		value: boolean
	}>,
	lineLength: {
		type: Number as PropType<number>,
		default: 3,
	},
	clear: {
		type: Function as PropType<() => void>,
		required: true,
	},
	search: {
		type: Function as PropType<() => void>,
		required: true,
	},
	loading: Boolean as PropType<boolean>,
	searchKey: {
		type: String as PropType<string>,
		required: true,
	},
	rowProps: {
		type: Object as PropType<ObjectMap>,
		default() {
			return {}
		},
	},
} as const

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(fn: any): fn is Function {
	return is(Function, fn)
}
const Rsearch = defineComponent({
	name: 'r-search',
	props: Props,
	setup(props, { slots }) {
		const customRow = ref<RowConf[]>([]) // 用户自定义的
		const propsRows = ref<any[]>([])
		const columnsData = ref<any[]>([])
		const visible = ref(false)
		function custom() {
			visible.value = true
		}

		function submit(row: RowConf[]) {
			if (isTrue(props.searchKey)) {
				localStorage.setItem(props.searchKey + '-search', JSON.stringify(row))
				setColumnsData()
			}
		}
		function renderRowProps(data: any) {
			if (isFunction(data)) {
				return data()
			} else {
				return { ...(props?.rowProps || {}), ...data }
			}
		}

		watch(
			() => props.rows,
			(value) => {
				propsRows.value = deepClone(value) || []
				setColumnsData()
			},
			{ deep: true, immediate: true }
		)

		function setData(data: any[]) {
			customRow.value = data.map((item) => {
				return setCustomRow(item)
			})
		}

		function setColumnsData() {
			let data: any
			if (isTrue(props.searchKey)) {
				data = localStorage.getItem(props.searchKey + '-search')
			}
			if (isTrue(data)) {
				const columnsCopy = deepClone(propsRows.value)
				const setData = columnsSetArrayDiffArray(columnsCopy, JSON.parse(data))
				columnsData.value = setData.columns
				localStorage.setItem(props.searchKey + '-search', JSON.stringify(setData.customRow))
				customRow.value = setData.customRow
			} else {
				const columnsCopy = deepClone(propsRows.value)
				setData(columnsCopy)
				columnsData.value = columnsCopy
			}
		}
		return () => {
			return (
				<>
					<div class="top-search-from-nowidth top-search-from">
						{renderSlot(slots, 'header')}
						<div>
							<a-form labelCol={props.labelCol ?? { span: 8 }} wrapperCol={props.wrapperCol ?? { span: 14 }}>
								<Row>
									{columnsData.value.map((row, index) => {
										if (!isTrue(row)) {
											return ''
										}
										if (index + 1 > props.lineLength) {
											if (isTrue(props?.expand?.value)) {
												if (!props?.expand?.value) {
													return ''
												}
											}
										}
										return (
											<Col {...(row.colProps || { span: 6 })} key={row.key}>
												{row.render ? (
													row.render()
												) : row.slotName && slots[row.slotName] ? (
													renderSlot(slots, row.slotName)
												) : (
													<a-form-item label={row.title} name={row.key} {...{ wrapperCol: row.wrapperCol }}>
														{h(isString(row.component) ? resolveComponent(row.component) : row.component, {
															...renderRowProps(row.props),
															[row.modelValue ?? 'value']: props.model[row.key],
															[`onUpdate:${row.modelValue ?? 'value'}`]: ($event: any) =>
																(props.model[row.key] = $event),
														})}
													</a-form-item>
												)}
											</Col>
										)
									})}
									<Col span={6}>
										<a-form-item labelCol={{ span: 0 }} wrapperCol={{ span: 20 }}>
											<a-button type="primary" loading={props.loading} onClick={props.search}>
												查询
											</a-button>
											<a-button onClick={props.clear}>清除</a-button>
											{props.expand && columnsData.value.length > props.lineLength && (
												<a class="expand" onClick={props.expand.expandToggle}>
													<DownOutlined rotate={props.expand.value ? 180 : 0} />
													{props.expand.value ? '收起' : '更多'}
												</a>
											)}
											<a class="expand" onClick={custom}>
												<a-tooltip placement="topLeft" title="自定义显示">
													<SettingOutlined />
												</a-tooltip>
											</a>
										</a-form-item>
									</Col>
								</Row>
							</a-form>
						</div>
					</div>
					<Rconfigure
						v-model={visible.value}
						onSubmit={submit}
						title="查询条件调整自定义"
						columns={clone(customRow.value) as any}
					/>
				</>
			)
		}
	},
})

Rsearch.install = function (app: App) {
	app.component(Rsearch.name, Rsearch)
	return app
}
interface searchHookes {
	useRequest: any
	usePagination: any
	useSearch: any
}

export default Rsearch as typeof Rsearch & Plugin & searchHookes
