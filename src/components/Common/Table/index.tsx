import { defineComponent, ref, watch, PropType, App, Plugin, markRaw, renderSlot, onMounted } from 'vue'
import { Button, Divider, Table } from 'ant-design-vue'
import { deepClone, isTrue } from '@/utils'
import { clone } from 'ramda'
import { columnsSetArrayDiffArray, setCustomRow } from '../utils/index'
import Rconfigure from '@/components/Common/Configure'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { ColumnsType } from 'ant-design-vue/lib/table/interface'
import './index.less'
let uuid = 1
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
	loading: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	scrollDom: null, // 父类的滚动节点
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

		// 底部滚动bug
		let scrollDom = ''
		const stickyShow = ref(true)
		const scrollWidth = ref(0)
		uuid++
		const unique = (import.meta.env.VITE_APP_ID || 'r_table_unique') + '_' + uuid

		onMounted(() => {
			const tableDom: any = document.querySelector('.' + unique + '_r_table .ant-table-header table')
			const tableScroll: any = document.querySelector('.' + unique + '_r_table .ant-table-body')

			let timeOut: any = null
			function setScrollWidth() {
				if (!tableScroll) return
				if (tableScroll.scrollLeft) {
					scrollWidth.value = tableDom?.offsetWidth
				} else {
					tableScroll.scrollLeft = 1
					if (tableScroll.scrollLeft) {
						scrollWidth.value = tableDom?.offsetWidth
					} else {
						scrollWidth.value = 0
					}
				}
			}
			function stickyInit() {
				// 监听table是不是到低了 通过IntersectionObserver 判断 table_footer_dom是否先显示区域
				const options = {
					threshold: 1.0,
					root: props.scrollDom ?? document.querySelector('.ht_a_layout_content '), // 必须是目标元素的父级元素
				}
				const callback = (entries: any) => {
					entries.forEach((entry: any) => {
						stickyShow.value = !entry.isIntersecting
					})
				}
				const observer = new IntersectionObserver(callback, options)
				const target: any = document.querySelector('.' + unique + '_table_footer_dom')
				observer.observe(target as any)

				const sticky_scrollLeft: any = document.querySelector('.' + unique + '_sticky_scrollLeft')

				tableScroll.addEventListener('scroll', (e: any) => {
					if (scrollDom === 'sticky') {
						scrollDom = ''
						return
					}
					scrollDom = 'table'
					sticky_scrollLeft.scrollLeft = e?.target?.scrollLeft
				})
			}

			if (props.sticky) {
				stickyInit()
			}

			watch(
				() => props.columns,
				async (value) => {
					propsColumns.value = deepClone(value) || []
					setTableColumnsData()
					clearTimeout(timeOut)
					timeOut = setTimeout(() => {
						setScrollWidth()
					}, 10)
				},
				{ deep: true, immediate: true }
			)
			watch(
				() => props.dataSource,
				(value) => {
					dataSource.value = deepClone(value) || []
				},
				{ deep: true, immediate: true }
			)
		})

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
					<div style="margin: 6px 0  16px">
						<UnorderedListOutlined style="margin: 0 8px 0 0 " />
						<span style="font-size: 16px;">数据列表</span>
						{props.setup && (
							<>
								<Button
									type="primary"
									style="margin: 0 0 0 16px;"
									onClick={() => {
										visible.value = true
									}}
								>
									自定义显示
								</Button>
								<Button loading={props.loading} type="primary" style="margin: 0 0 0 16px;" onClick={refresh}>
									刷新页面
								</Button>
							</>
						)}
					</div>
					<div>{renderSlot(context.slots, 'headerButton')}</div>
				</div>
			)
		}

		let tableParam: any = {
			rowClassName: (_record: any, index: any) => {
				return index % 2 === 1 ? 'table_striped' : ''
			},
		}
		if (props.sticky) {
			tableParam = {
				...tableParam,
				scroll: { x: 200 },
			}
		}
		return () => (
			<div
				class={`r_table ${unique}_r_table`}
				style="background: #fff;padding: 0 16px; box-sizing: border-box;position: relative;"
			>
				<div style="position: relative;">
					<Divider style="margin: 0;  padding: 0 0 10px 0;" />
					{headerButtonItem()}
					<Table
						pagination={props.pagination as any}
						dataSource={dataSource.value}
						sticky={props.sticky}
						loading={props.loading}
						columns={columnsData.value}
						{...{
							...tableParam,
							...context.attrs,
						}}
					/>
					{props.sticky && (
						<>
							<div
								class={`${unique}_sticky_scrollLeft r_table_sticky_scrollLeft`}
								style={{
									position: stickyShow.value ? 'sticky' : 'absolute',
									visibility: stickyShow.value ? 'visible' : 'hidden',
								}}
								onScroll={(e: any) => {
									if (scrollDom === 'table') {
										scrollDom = ''
										return
									}
									const data: any = document.querySelector('.r_table .ant-table-body')
									data.scrollLeft = e?.target?.scrollLeft
								}}
							>
								<div style={{ width: scrollWidth.value + 'px', height: '1px' }} />
							</div>
							<div class={`${unique}_table_footer_dom table_footer_mark`} />
						</>
					)}

					<Rconfigure
						v-model={visible.value}
						onSubmit={submit}
						title="查询条件调整自定义"
						columns={clone(customRow.value) as any}
					/>
				</div>
			</div>
		)
	},
})

_Table.install = function (app: App) {
	app.component(_Table.name, _Table)
	return app
}
export default markRaw(_Table) as typeof _Table & Plugin
