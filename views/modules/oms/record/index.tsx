import { defineComponent, ref } from 'vue'
import { Common, RSearch, RTable } from '@/components'
import { orderReturnProductOrders } from '@/api/erp/oms'
import { SearchRow, TableRow } from './util'
import Modules from './modules'
import { defaultRowProps } from '@/config'
const { useSearch, useRequest, commonly } = Common
const pageKey = 'orderLogistics'
export default defineComponent({
	name: pageKey,
	setup() {
		const { searchForm } = useSearch<ObjectMap>({})
		const pageSate = ref({}) // 搜索表单的特殊参数数据列表
		const searchRow = new SearchRow().data // 搜索表单的数据列表
		const tableRow = new TableRow({ setModuleState, setModuleData }).data // 表单的数据列表
		const moduleState = ref<ObjectMap>({
			// checkForm: true,
		}) //表单操作列 操作modules组件的状态
		const moduleData = ref<ObjectMap>({}) //表单操作列 操作modules组件的参数
		function setModuleState(item: ObjectMap) {
			moduleState.value = item
		}
		function setModuleData(item: ObjectMap) {
			moduleData.value = item
		}

		const { run, data, renderPagination, getPagination, loading, refresh } = useRequest(orderReturnProductOrders, {
			manual: true,
			pagination: true,
		})
		const { searchSlots, rSearch, rClear } = commonly({
			pageSate,
			searchForm,
			searchRows: searchRow,
			run,
			getPagination,
		})

		return () => (
			<>
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
				{renderPagination()}
				<Modules v-model={[moduleState.value, 'value']} {...moduleData.value} />
			</>
		)
	},
})
