export function testInitial(pageKey: string, configArray: string[]) {
	const operationComponents = configArray.includes('operation')
	return `
  import { defineComponent, ref } from 'vue'
  import { Common, RSearch, RTable } from '@/components'
  import { SearchRow } from './util'
  ${operationComponents ? "import Modules from './modules'" : ''}
  import { defaultRowProps } from '@/config'
  const { useSearch, useRequest, commonly } = Common
  const pageKey = ${pageKey}
  export default defineComponent({
    name: pageKey,
    setup() {
      const { searchForm } = useSearch<ObjectMap>({})
      const pageSate = ref({}) // 搜索表单的特殊参数数据列表
      const searchRow = new SearchRow(searchForm).data // 搜索表单的数据列表
      
      ${
				operationComponents
					? `
      const tableRow = new TableRow({ operation }).data // 表单的数据列表
      const moduleState = ref({}) //表单操作列 操作modules组件的参数
      function operation(item: ObjectMap) {
        moduleState.value = item
      }
      `
					: `
        const tableRow = new TableRow().data // 表单的数据列表
      `
			}
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

      return () => (
        <>
          <RSearch
            searchKey={pageKey + 'Search'}
            clear={rClear}
            loading={loading.value}
            search={rSearch}
            v-slots={{
              ...searchSlots(true)
            }}
            {...{ rowProps: defaultRowProps}}
            model={searchForm.value}
            rows={searchRow}
          />
          <RTable
            searchKey={pageKey + 'Table'}
            refresh={refresh}
            dataSource={data.value?.data?.items}
            columns={tableRow}
            {...{ loading: loading.value }}
          />
          {renderPagination()}
          ${operationComponents ? `<Modules v-model={[moduleState.value, 'value']} />` : ''}
          
        </>
      )
    }
  })
  `
}

// const operation1 = {
// 	code: `
//   	const moduleState = ref({}) //表单操作列 操作modules组件的参数
// 		function operation(item: ObjectMap) {
// 			moduleState.value = item
// 		}
//   `,
// 	components: `
//   <Modules v-model={[moduleState.value, 'value']} />
//   `,
// }
