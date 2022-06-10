const pageKey = ''

const RSearch = {
	import: `
  const { useSearch, useRequest, commonly } = Common
  import { defaultRowProps } from '@/config'
  `,
	code: `
	const { searchForm } = useSearch<ObjectMap>({})
	const pageSate = ref({}) // 搜索表单的特殊参数数据列表
	const searchRow = new SearchRow(searchForm).data // 搜索表单的数据列表
			const { run, data, renderPagination, getPagination, loading, refresh } = useRequest('API', {
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
  `,
	components: `
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
  `,
}

const RTable = {
	code: `
  	const tableRow = new TableRow({ operation }).data // 表单的数据列表
  `,
	components: `
    <RTable
      searchKey={pageKey + 'Table'}
      refresh={refresh}
      dataSource={data.value?.data?.items}
      columns={tableRow}
      {...{ loading: loading.value }}
    />
    {renderPagination()}
`,
}

const operation = {
	code: `
  	const moduleState = ref({}) //表单操作列 操作modules组件的参数
		function operation(item: ObjectMap) {
			moduleState.value = item
		}
  `,
	components: `
  <Modules v-model={[moduleState.value, 'value']} />
  `,
}

function initial(pageKey: string, configArray: string[]) {
	const searchComponents = configArray.includes('RSearch')
	const tableComponents = configArray.includes('RTable')
	const operationComponents = configArray.includes('operation')
	return `
  import { defineComponent, ref } from 'vue'
  ${searchComponents && tableComponents && "import { Common, RSearch, RTable } from '@/components'"}
  ${searchComponents && tableComponents && "import { SearchRow, TableRow } from './util'"}
  ${searchComponents && RSearch.import}

  ${pageKey && 'const pageKey =' + pageKey}
  export default defineComponent({
  ${pageKey && 'name: ' + pageKey + ','}
    setup() {
    ${searchComponents && RSearch.code}
    ${operationComponents && operation.code}
    ${searchComponents && RSearch.code}

      return () => (
        <>
        </>
      )
    },
  })`
}
