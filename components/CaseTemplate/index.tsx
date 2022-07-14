import { Common, RSearch, RTable } from '@/components'
import { defineComponent, ref } from 'vue'
import { SearchRow, TableRow } from './util'
const { useSearch, useRequest, commonly } = Common
import { servicesSupplierProductInfo } from '@child/api/products/index'
import { defaultRowProps } from '@/config'
import { mockDataSource } from '@/utils'

const pageKey = 'CaseTemplate'
export default defineComponent({
	name: pageKey,
	setup() {
		const pageSate = ref({}) // 搜索表单的特殊参数数据列表
		const { searchForm, expand } = useSearch<ObjectMap>({}, true)
		const searchRow = new SearchRow(searchForm).data // 搜索表单的数据列表
		const { run, data, renderPagination, getPagination, loading, refresh, pageSize, current } = useRequest(
			servicesSupplierProductInfo,
			{
				manual: true,
				pagination: true,
				defaultParams: [],
			}
		)
		const { searchSlots, rSearch, rClear } = commonly({
			pageSate,
			searchForm,
			searchRows: searchRow,
			run,
			getPagination,
			setSearchData: (value: any) => {
				return value
			},
		})
		function setModuleData(item: ObjectMap) {
			console.log(item)
		}
		const tableRow = new TableRow({
			setModuleData,
			tableData: { pageSize: pageSize, current: current },
		}).data // 表单的数据列表1
		return () => (
			<>
				{/* 顶部检索 */}
				<RSearch
					searchKey={pageKey + 'Search'}
					clear={rClear}
					loading={loading.value}
					search={rSearch}
					v-model={[expand.value, 'expand']}
					// lineLength={8} // 自定义显示条件
					v-slots={{
						// 是否全部显示
						...searchSlots(true),
					}}
					{...{ rowProps: defaultRowProps }}
					model={searchForm.value}
					rows={searchRow}
				/>

				{/* 表格 */}
				<RTable
					searchKey={pageKey + 'Table'}
					refresh={refresh}
					v-slots={{
						// 自定义
						headerButton: () => {
							return <div>1111</div>
						},
					}}
					// dataSource={data.value?.data?.data}
					dataSource={mockDataSource(tableRow)}
					columns={tableRow}
					{...{ loading: loading.value }}
				/>

				{/* 分页 */}
				{renderPagination()}
			</>
		)
	},
})
