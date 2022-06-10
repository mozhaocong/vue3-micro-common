import { defineComponent, ref } from 'vue'
import { Common, FormRadioGroup, RSearch, RTable } from '@/components'
import { SearchRow, TableRow } from './util'
import { orderOutRepoOrders } from '@/api/erp/oms'
import { defaultRowProps } from '@/config'
import Modules from './modules'
const { useSearch, useRequest, commonly } = Common
const pageKey = 'shippingOrder'
export default defineComponent({
	name: pageKey,
	setup() {
		const pageSate = ref({}) // 搜索表单的特殊参数数据列表
		const { searchForm, expand } = useSearch<ObjectMap>({})
		const searchRow = new SearchRow(searchForm).data // 搜索表单的数据列表
		const moduleState = ref<ObjectMap>({}) //表单操作列 操作modules组件的状态
		const moduleData = ref<ObjectMap>({}) //表单操作列 操作modules组件的参数
		// pageSize // 分页条数
		// current // 当前页
		// loading // 数据请求loading
		// refresh // 刷新
		// renderPagination // 分页控件
		// getPagination // 数据请求函数
		const { run, data, renderPagination, getPagination, loading, refresh, pageSize, current } = useRequest(
			orderOutRepoOrders,
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
				console.log(value)
				// value.supplier_name = '125612645858'
				return value
			},
		})
		const tableRow = new TableRow({
			setModuleState,
			setModuleData,
			tableData: { pageSize: pageSize, current: current },
		}).data // 表单的数据列表
		function setModuleState(item: ObjectMap) {
			moduleState.value = item
		}
		function setModuleData(item: ObjectMap) {
			moduleData.value = item
		}
		return () => (
			<>
				{/* 顶部检索 */}
				<RSearch
					searchKey={pageKey + 'Search'}
					clear={rClear}
					loading={loading.value}
					search={rSearch}
					v-model={[expand.value, 'expand']}
					// lineLength={15}
					v-slots={{
						...searchSlots(true),
					}}
					{...{ rowProps: defaultRowProps }}
					model={searchForm.value}
					rows={searchRow}
				/>
				{/* <div>{test.value}</div> <div>{test.value}11</div> */}

				{/* 表格 */}
				<RTable
					searchKey={pageKey + 'Table'}
					refresh={refresh}
					dataSource={data.value?.data?.data}
					columns={tableRow}
					{...{ loading: loading.value }}
				/>

				{/* 分页 */}
				{renderPagination()}

				<Modules v-model={[moduleState.value, 'value']} {...moduleData.value} />
			</>
		)
	},
})
