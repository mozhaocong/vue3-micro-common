import { defineComponent, ref } from 'vue'
import { Common, FormRadioGroup, RSearch, RTable } from '@/components'
import { SearchRow, TableRow } from './util'
import { giftCardDetails } from '@/api/erp/crm/customer'
import { defaultRowProps } from '@/config'
const { useSearch, useRequest, commonly } = Common
const pageKey = 'CTableTest'
export default defineComponent({
	name: pageKey,
	setup() {
		const test = ref('海绵宝宝')
		const pageSate = ref({}) // 搜索表单的特殊参数数据列表
		const { searchForm } = useSearch<ObjectMap>({})
		const searchRow = new SearchRow(searchForm).data // 搜索表单的数据列表
		const moduleState = ref<ObjectMap>({
			// checkForm: true,
		}) //表单操作列 操作modules组件的状态
		const moduleData = ref<ObjectMap>({}) //表单操作列 操作modules组件的参数
		// pageSize // 分页条数
		// current // 当前页
		// loading // 数据请求loading
		// refresh // 刷新
		// renderPagination // 分页控件
		// getPagination // 数据请求函数
		const { run, data, renderPagination, getPagination, loading, refresh, pageSize, current } = useRequest(
			giftCardDetails,
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
		console.log(data.value)
		const tableRow = new TableRow({
			setModuleState,
			setModuleData,
			tableData: { pageSize: pageSize, current: current },
		}).data // 表单的数据列表
		function setModuleState(item: ObjectMap) {
			console.log(item, 'setModuleState')
			moduleState.value = item
		}
		function setModuleData(item: ObjectMap) {
			console.log(item, 'setModuleData')
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
					lineLength={15}
					v-slots={{
						...searchSlots(true),
					}}
					{...{ rowProps: defaultRowProps, wrapperCol: { span: 12 }, labelCol: { span: 12 } }}
					model={searchForm.value}
					rows={searchRow}
				/>
				{/* <div>{test.value}</div> <div>{test.value}11</div> */}

				{/* 表格 */}
				<RTable
					searchKey={pageKey + 'Table'}
					refresh={refresh}
					dataSource={data.value?.data?.items}
					columns={tableRow}
					style="margin-bottom:10px"
					{...{ loading: loading.value }}
				/>

				{/* 分页 */}
				{renderPagination()}
			</>
		)
	},
})
