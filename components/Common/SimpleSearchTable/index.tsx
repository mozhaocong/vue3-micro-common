import { defineComponent, PropType, ref } from 'vue'
import { RSearch, RTable } from '@/components'
import { defaultRowProps } from '@/config'
import { useSearch } from '@/components/Common/Search/hooks/UseSearch'
import { commonly } from '@/components/Common/Search/hooks/PublicMethod'
import { useRequest } from '@/components/Common/Search/hooks/UseRequest'
// const { useSearch, useRequest, commonly } = Common

type optionConfig = {
	// setTableDataSource?: (item: ObjectMap[]) => ObjectMap[]
}
const Props = {
	pageKey: { type: String as PropType<string>, required: true },
	searchRow: { type: Array as PropType<any[]>, required: true },
	tableRow: { type: Array as PropType<any[]>, required: true },
	useRequestApi: { type: Function as PropType<() => Promise<any>>, required: true },
	tableDataSource: { type: Function as PropType<(item: ObjectMap) => any[]>, required: true },
	optionConfig: { type: Object as PropType<optionConfig> },
} as const
export default defineComponent({
	props: Props,
	emits: ['initComplete'],
	setup(props, { expose, emit }) {
		const { searchForm } = useSearch<ObjectMap>({})
		const pageSate = ref({}) // 搜索表单的特殊参数数据列表
		const searchRow = props.searchRow // 搜索表单的数据列表
		const dataSource = ref<any[]>([])
		const { run, runSearchData, renderPagination, getPagination, loading, refresh, pageSize, current } = useRequest(
			props.useRequestApi,
			{
				manual: true,
				pagination: true,
				defaultParams: [],
				onSuccess: (item) => {
					dataSource.value = props.tableDataSource(item)
				},
			}
		)

		const { searchSlots, rSearch, rClear } = commonly({
			pageSate,
			searchForm,
			searchRows: searchRow,
			run,
			getPagination,
			// setSearchData(item) {
			// 	if (isTrue(item.category)) {
			// 		item.category = item.category.join(',')
			// 	}
			// 	return item
			// },
		})

		const tableRow = props.tableRow

		expose({ pageSize, current, dataSource })
		emit('initComplete', { searchForm, refresh })

		return () => (
			<div>
				<RSearch
					searchKey={props.pageKey + 'Search'}
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
					searchKey={props.pageKey + 'Table'}
					refresh={refresh}
					dataSource={dataSource.value}
					columns={tableRow}
					{...{ loading: loading.value }}
				/>
				{renderPagination(runSearchData.value)}
			</div>
		)
	},
})
