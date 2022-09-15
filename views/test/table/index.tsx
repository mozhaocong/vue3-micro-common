import { defineComponent, ref } from 'vue'
import { Common, FormRadioGroup, RSearch, RTable } from '@/components'
import { customer } from '@/api/erp/crm/customer'
import { dataSource, SearchRow, TableRow } from '@/views/test/table/util'
import Modules from './modules'
import { defaultRowProps } from '@/config'
import { Button } from 'ant-design-vue'
const { useSearch, useRequest, commonly } = Common
export default defineComponent({
	name: 'testChildren1Data1',
	setup() {
		const { searchForm } = useSearch<ObjectMap>({})
		const pageSate = ref({
			createBy: {
				isSearch: true,
				slotType: 'selectOption',
				slotList: [
					{ label: '创建人1111111', key: 'createBy', component: 'a-input' },
					{ label: '当前处理人', key: 'currentHandler', component: 'a-input' },
				],
				selectKey: 'createBy',
				value: {},
			},
			spPlatform1: {
				isSearch: true,
				slotType: 'rangePicker',
				slotList: [
					{ label: '创建时间1', key: 'createTimeGe1', rangePicker: ['createTimeGe1', 'createTimeLe1'] },
					{ label: '交易时间2', key: 'createTimeGe2', rangePicker: ['createTimeGe2', 'createTimeLe2'] },
					{ label: '交易时间3', key: 'createTimeGe3', rangePicker: ['createTimeGe3', 'createTimeLe3'] },
					{ label: '交易时间4', key: 'createTimeGe4', rangePicker: ['createTimeGe4', 'createTimeLe4'] },
					// { label: '交易时间5', key: 'createTimeGe5', rangePicker: ['createTimeGe2', 'createTimeLe2'] },
					// { label: '交易时间6', key: 'createTimeGe6', rangePicker: ['createTimeGe2', 'createTimeLe2'] },
					// { label: '交易时间7', key: 'createTimeGe7', rangePicker: ['createTimeGe2', 'createTimeLe2'] }
				],
				selectKey: 'createTimeGe1',
				value: [],
			},
		}) // 搜索表单的特殊参数数据列表
		const searchRow = new SearchRow(searchForm).data // 搜索表单的数据列表
		const tableRow = new TableRow().data // 表单的数据列表
		const moduleState = ref({}) //表单操作列 操作modules组件的参数
		function operation(item: ObjectMap) {
			moduleState.value = item
		}
		const { run, renderPagination, getPagination, loading, refresh } = useRequest(customer, {
			manual: true,
			pagination: true,
			defaultParams: [[]],
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
				<FormRadioGroup
					prop="baseYesNoStatus"
					countList={{ 0: 10, 1: 20 }}
					v-model={[searchForm.value.statusTest, 'value']}
					onSearch={rSearch}
				/>
				<RSearch
					searchKey="testReport"
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
					v-slots={{
						headerButton: () => {
							return (
								<>
									<Button>冻结订单</Button>
									<Button>财务导出</Button>
									<Button>签出</Button>
									<Button>签出</Button>
									<Button>拆分</Button>
								</>
							)
						},
					}}
					refresh={refresh}
					dataSource={dataSource}
					columns={tableRow}
					{...{ loading: loading.value }}
				/>
				{renderPagination()}
				<Modules v-model={[moduleState.value, 'value']} />
			</>
		)
	},
})
