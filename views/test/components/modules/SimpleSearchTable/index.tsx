import { defineComponent, ref } from 'vue'
import { SimpleSearchTable } from '@/components'
import { baseCountry } from '@/api/erp/base'

function setSearchRow(data: any) {
	return [
		{
			title: '国家(中文)',
			key: 'no',
			props: {
				onChange: (item: any) => {
					console.log(item, data)
				},
			},
		},
	]
}

export default defineComponent({
	name: 'simpleSearchTableTest',
	setup() {
		let data: any = null
		const searchRow = ref([
			{
				title: '国家(中文)',
				key: 'no',
				props: {
					onChange: (item: any) => {
						data.value.no1 = 123
					},
				},
			},
			{
				title: '国家(中文)',
				key: 'no1',
				display: () => {
					return data?.value?.no == 11
				},
				props: {
					onChange: (item: any) => {
						console.log(item, data.value)
					},
				},
			},
		])
		const tableRow = ref([
			{ title: '中文国家/地区名称', dataIndex: 'name_cn', align: 'center', width: 300 },
			{ title: '英文国家/地区名称', dataIndex: 'name', align: 'center', width: 300 },
		])
		function onInitComplete(item: any) {
			console.log(item)
			data = item.searchForm
			searchRow.value = setSearchRow(item) as any
		}
		return () => (
			<SimpleSearchTable
				pageKey="simpleSearchTableTest"
				onInitComplete={onInitComplete}
				searchRow={searchRow.value}
				tableRow={tableRow.value}
				useRequestApi={baseCountry}
				tableDataSource={(item) => {
					return item?.data?.data || []
				}}
			/>
		)
	},
})
