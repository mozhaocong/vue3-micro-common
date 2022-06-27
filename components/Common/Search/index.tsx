import { PropType, ref, defineComponent, App, Plugin, renderSlot, watch, computed } from 'vue'
import { DownOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { RForm } from '@/components'
import { clone } from 'ramda'
import Reconfigure from '../Configure'
import { deepClone, isTrue } from '@/utils'
import { columnsSetArrayDiffArray, setCustomRow } from '@/components/Common/utils'
import { Button, Divider } from 'ant-design-vue'
import { DoubleRightOutlined } from '@ant-design/icons-vue'
import './index.less'
const Props = {
	model: {
		type: Object as PropType<ObjectMap>,
		required: true,
	},
	rows: {
		type: Array as PropType<FormRowArray>,
		required: true,
	},
	labelCol: {
		type: Object as PropType<LabelCol>,
		default: () => {
			return { style: { width: '100px', margin: '0 16px 0 0' } }
		},
	},
	wrapperCol: {
		type: Object as PropType<LabelCol>,
		default: () => {
			return { style: { width: '220px', margin: '0 60px 0 0' } }
		},
	},
	labelAlign: {
		type: String as PropType<'left' | 'right'>,
		default: 'left',
	},
	colon: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	expand: null,
	lineLength: {
		type: Number as PropType<number>,
		default: 4,
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
	colSpan: { type: [Number, String] as PropType<number | ''>, default: '' },
} as const

const Rsearch = defineComponent({
	name: 'r-search',
	props: Props,
	emits: ['update:expand'],
	setup(props, { emit, slots, attrs }) {
		// console.log(attrs)
		const customRow = ref<FormRowArray>([]) // 用户自定义的
		const propsRows = ref<any[]>([])
		const columnsData = ref<any[]>([])
		const visible = ref(false)
		const expand = ref(false)
		const formItemStyle: ObjectMap = { margin: '0 0 16px' }

		const expandData = computed({
			get() {
				return props.expand ?? expand.value
			},
			set(data: boolean) {
				expand.value = data
				emit('update:expand', data)
			},
		})

		function custom() {
			visible.value = true
		}

		function submit(row: FormRowArray) {
			if (isTrue(props.searchKey)) {
				localStorage.setItem(props.searchKey + '-search', JSON.stringify(row))
				setColumnsData()
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

		function setCustomRowData(data: any[]) {
			const returnData = data.map((item) => {
				return setCustomRow(item)
			})
			customRow.value = returnData as any
		}

		function setColumnsData() {
			let data: any
			if (isTrue(props.searchKey)) {
				data = localStorage.getItem(props.searchKey + '-search')
			}
			if (isTrue(data)) {
				const columnsCopy = deepClone(propsRows.value)
				const setData = columnsSetArrayDiffArray(columnsCopy, JSON.parse(data as any))
				columnsData.value = setData.columns
				localStorage.setItem(props.searchKey + '-search', JSON.stringify(setData.customRow))
				customRow.value = setData.customRow
			} else {
				const columnsCopy = deepClone(propsRows.value)
				setCustomRowData(columnsCopy)
				columnsData.value = columnsCopy
			}
		}
		function filterColumnsData(data: any[]) {
			const returnData = data.filter((item, index) => {
				if (props.expand === null || expandData.value) return true
				return index + 1 <= props.lineLength
			})
			// returnData.push({
			// 	render: () => {
			// 		return (
			// 			<a-form-item labelCol={{ span: 0 }} wrapperCol={{ style: { width: '200px' } }} style={formItemStyle}>
			// 				<a-button type="primary" loading={props.loading} onClick={props.search}>
			// 					查询
			// 				</a-button>
			// 				<a-button onClick={props.clear}>清除</a-button>
			// {
			// 	props.expand !== null && columnsData.value.length > props.lineLength && (
			// 		<a
			// 			class="expand"
			// 			onClick={() => {
			// 				expandData.value = !expandData.value
			// 			}}
			// 		>
			// 			<DownOutlined rotate={expandData.value ? 180 : 0} />
			// 			{expandData.value ? '收起' : '更多'}
			// 		</a>
			// 	)
			// }
			// 				<a class="expand" onClick={custom}>
			// 					<a-tooltip placement="topLeft" title="自定义显示">
			// 						<SettingOutlined />
			// 					</a-tooltip>
			// 				</a>
			// 			</a-form-item>
			// 		)
			// 	},
			// })
			return returnData
		}

		function searchQuery() {
			return (
				<div style="display: flex;align-items: center;justify-content: space-between;">
					<div style="font-size: 16px;">
						<SearchOutlined style="margin: 0 11px 0 0" />
						搜索查询
					</div>
					<div>
						<Button loading={props.loading} type="primary" style="margin: 0 0 0 16px;" onClick={props.search}>
							查询
						</Button>
						<Button loading={props.loading} type="primary" style="margin: 0 0 0 16px;" onClick={props.clear}>
							重置
						</Button>
						{/*{props.expand !== null && columnsData.value.length > props.lineLength && (*/}
						{/*	<Button*/}
						{/*		type="primary"*/}
						{/*		style="margin: 0 0 0 16px;"*/}
						{/*		onClick={() => {*/}
						{/*			expandData.value = !expandData.value*/}
						{/*		}}*/}
						{/*	>*/}
						{/*		{expandData.value ? '收起' : '更多'}查询*/}
						{/*		<DownOutlined rotate={expandData.value ? 180 : 0} />*/}
						{/*	</Button>*/}
						{/*)}*/}

						<Button type="primary" onClick={custom} style="margin: 0 0 0 16px;">
							自定义显示
						</Button>
					</div>
				</div>
			)
		}
		return () => {
			return (
				<div style="position: relative; margin: 0 0 16px;border-radius: 4px;background: #fff;">
					<div style=" padding: 8px 16px 0;  box-sizing: border-box;">
						{searchQuery()}
						<Divider style="margin: 8px 0 17px;color: #F2EFFD" />
						{renderSlot(slots, 'searchHeader')}
						<RForm
							rows={filterColumnsData(columnsData.value)}
							{...attrs}
							v-slots={{ ...slots }}
							model={props.model}
							labelCol={props.labelCol}
							wrapperCol={props.wrapperCol}
							labelAlign={props.labelAlign}
							colon={props.colon}
							colSpan={props.colSpan}
							formItemStyle={formItemStyle}
						/>
					</div>
					{props.expand !== null && columnsData.value.length > props.lineLength && (
						<div
							class="more_but"
							onClick={() => {
								expandData.value = !expandData.value
							}}
						>
							<DoubleRightOutlined class="icon" rotate={expandData.value ? 270 : 90} />
							<div class="radius" />
						</div>
					)}
					<Reconfigure
						v-model={visible.value}
						onSubmit={submit}
						title="查询条件调整自定义"
						columns={clone(customRow.value) as any}
					/>
				</div>
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
