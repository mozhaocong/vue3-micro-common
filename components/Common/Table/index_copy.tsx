import { defineComponent, ref, watch, PropType, App, Plugin, markRaw, renderSlot } from 'vue'
import { Button, Divider, Table } from 'ant-design-vue'
import { deepClone, isTrue } from '@/utils'
import { clone } from 'ramda'
import { columnsSetArrayDiffArray, setCustomRow } from '../utils/index'
import Rconfigure from '@/components/Common/Configure'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { ColumnsType } from 'ant-design-vue/lib/table/interface'
import './index.less'
const propsData = {
	dataSource: {
		type: Array as PropType<any[]>,
		default() {
			return []
		},
	},
	columns: {
		type: Array as PropType<ColumnsType>,
		default() {
			return []
		},
	},
	searchKey: {
		type: String as PropType<string>,
		default: '',
	},
	refresh: {
		type: Function as PropType<() => void>,
	},
	// 表单设置
	setup: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	sticky: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	pagination: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
} as const

const _Table = defineComponent({
	props: propsData,
	name: 'RTable',
	setup(props, context) {
		const dataSource = ref<any[]>([])
		const propsColumns = ref<any[]>([])
		const customRow = ref<any[]>([])
		const columnsData = ref<any[]>([])
		const visible = ref(false)
		watch(
			() => props.dataSource,
			(value) => {
				dataSource.value = deepClone(value) || []
			},
			{ deep: true, immediate: true }
		)

		watch(
			() => props.columns,
			(value) => {
				propsColumns.value = deepClone(value) || []
				setTableColumnsData()
			},
			{ deep: true, immediate: true }
		)

		function setColumnsData(data: any[]) {
			customRow.value = data.map((item) => {
				return setCustomRow(item)
			})
		}

		function setTableColumnsData() {
			let data: any
			if (isTrue(props.searchKey)) {
				data = localStorage.getItem(props.searchKey + '-table')
			}
			if (isTrue(data)) {
				const columnsCopy = propsColumns.value.map((item) => {
					item.key = item.dataIndex ?? item.key
					return item
				})
				const setData = columnsSetArrayDiffArray(columnsCopy, JSON.parse(data))
				columnsData.value = setData.columns
				localStorage.setItem(props.searchKey + '-table', JSON.stringify(setData.customRow))
				customRow.value = setData.customRow
			} else {
				const columnsCopy = deepClone(propsColumns.value)
				setColumnsData(columnsCopy)
				columnsData.value = columnsCopy
			}
		}

		function submit(data: any) {
			if (isTrue(props.searchKey)) {
				localStorage.setItem(props.searchKey + '-table', JSON.stringify(data))
				setTableColumnsData()
			}
		}

		function refresh() {
			if (props.refresh) {
				props.refresh()
			}
		}
		function headerButtonItem() {
			return (
				<div style="display: flex;align-items: center;justify-content: space-between;">
					<div style="margin: 7px 0 ">
						<UnorderedListOutlined style="margin: 0 8px 0 0 " />
						<span style="font-size: 16px;">数据列表</span>
						{props.setup && (
							<>
								<Button
									style="margin: 0 0 0 16px;"
									onClick={() => {
										visible.value = true
									}}
								>
									自定义显示
								</Button>
								<Button style="margin: 0 0 0 16px;" onClick={refresh}>
									刷新页面
								</Button>
							</>
						)}
					</div>
					<div>{renderSlot(context.slots, 'headerButton')}</div>
				</div>
			)
		}
		return () => (
			<div class="r_table" style="background: #fff;padding: 0 16px; box-sizing: border-box;">
				<Divider style="margin: 0;  padding: 0 0 10px 0;" />
				{headerButtonItem()}
				{/*{props.setup && (*/}
				{/*	<div>*/}
				{/*		<a-tooltip*/}
				{/*			placement="topLeft"*/}
				{/*			title={'自定义显示'}*/}
				{/*			onClick={() => {*/}
				{/*				visible.value = true*/}
				{/*			}}*/}
				{/*		>*/}
				{/*			<SettingOutlined style="margin: 0 10px;" />*/}
				{/*		</a-tooltip>*/}
				{/*		<a-tooltip placement="topLeft" title={'刷新页面'} onClick={refresh}>*/}
				{/*			<ReloadOutlined />*/}
				{/*		</a-tooltip>*/}
				{/*	</div>*/}
				{/*)}*/}
				<Table
					pagination={props.pagination as any}
					dataSource={dataSource.value}
					sticky={props.sticky}
					scroll={{ x: 1500 }}
					columns={columnsData.value}
					{...{
						rowClassName: (_record, index) => {
							return index % 2 === 1 ? 'table-striped' : ''
						},
						...context.attrs,
					}}
				/>
				<Rconfigure
					v-model={visible.value}
					onSubmit={submit}
					title="查询条件调整自定义"
					columns={clone(customRow.value) as any}
				/>
			</div>
		)
	},
})

_Table.install = function (app: App) {
	app.component(_Table.name, _Table)
	return app
}
export default markRaw(_Table) as typeof _Table & Plugin
