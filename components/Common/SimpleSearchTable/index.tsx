import { computed, defineComponent, PropType, ref } from 'vue'
import { Common, RSearch, RTable } from '@/components'
import { customer } from '@/api/erp/crm/customer'
import { defaultRowProps } from '@/config'
import { isTrue } from '@/utils'
const { useSearch, useRequest, commonly } = Common

type optionConfig = {
	setTableDataSource?: (item: ObjectMap[]) => ObjectMap[]
}
const Props = {
	pageKey: { type: String as PropType<string>, required: true },
	searchRow: { type: Array as PropType<any[]>, required: true },
	tableRow: { type: Array as PropType<any[]>, required: true },
	optionConfig: { type: Object as PropType<optionConfig> },
} as const
export default defineComponent({
	props: Props,
	setup(props, { expose }) {
		const { setTableDataSource } = props.optionConfig || {}
		const { searchForm } = useSearch<ObjectMap>({})
		const pageSate = ref({}) // 搜索表单的特殊参数数据列表
		const searchRow = props.searchRow // 搜索表单的数据列表
		const dataSource = ref<any[]>([])
		const { run, data, runSearchData, renderPagination, getPagination, loading, refresh, pageSize, current } =
			useRequest(customer, {
				manual: true,
				pagination: true,
				defaultParams: [],
				onSuccess: (item) => {
					if (setTableDataSource) {
						dataSource.value = setTableDataSource(item)
					}
				},
			})

		const tableDataSource = computed(() => {
			return []
		})
		const { searchSlots, rSearch, rClear } = commonly({
			pageSate,
			searchForm,
			searchRows: searchRow,
			run,
			getPagination,
			setSearchData(item) {
				if (isTrue(item.category)) {
					item.category = item.category.join(',')
				}
				return item
			},
		})

		const tableRow = props.tableRow

		expose({ pageSize, current, data })
		return () => (
			<div>
				<RSearch
					searchKey={pageKey + 'Search'}
					clear={rClear}
					loading={loading.value}
					search={rSearch}
					v-slots={{
						...searchSlots(true),
					}}
					{...{ rowProps: defaultRowProps }}
					model={searchForm.value}
					rows={searchRow}
				/>
				<RTable
					searchKey={pageKey + 'Table'}
					refresh={refresh}
					dataSource={data.value?.data?.data}
					columns={tableRow}
					{...{ loading: loading.value }}
				/>
				{renderPagination(runSearchData.value)}
			</div>
		)
	},
})
