import { defineComponent, reactive, ref } from 'vue'
import { SimpleSearchTable } from '@/components'
import { roleFindParams } from '@/api/localhost/base/role'
import { Button } from 'ant-design-vue'
import AssociationGroup from './model/AssociationGroup'
function searchRow() {
	const data: FormRowArray = [
		{ key: 'id', title: 'ID' },
		{ key: 'roleName', title: '角色名称' },
	]
	return data
}

function tableRow(config: ObjectMap): formTableColumnsType {
	const data: formTableColumnsType = [
		{ dataIndex: 'id', title: 'ID', width: 100, align: 'center' },
		{ dataIndex: 'roleName', title: '角色名称', width: 100, align: 'center' },
		{ dataIndex: 'createdAt', title: '创建时间', width: 100, align: 'center' },
		{ dataIndex: 'updateAt', title: '更新时间', width: 100, align: 'center' },
		{
			dataIndex: 'operate',
			title: '操作',
			align: 'center',
			width: 100,
			customRender: ({ record }) => {
				return (
					<div>
						<Button onClick={() => config.associationGroup(record)}>关联群组</Button>
					</div>
				)
			},
		},
	]
	return data
}

export default defineComponent({
	name: 'basisPageRole',
	setup() {
		let searchForm = ''
		const operateData = reactive({
			associationGroupVisible: false,
		})
		function onInitComplete(item: any) {
			searchForm = item.searchForm
		}
		const tableOperateConfig = {
			associationGroup: (item: any) => {
				operateData.associationGroupVisible = true
				// console.log('item', item)
			},
		}
		return () => (
			<>
				<SimpleSearchTable
					pageKey="basisPageRole"
					onInitComplete={onInitComplete}
					searchRow={searchRow()}
					tableRow={tableRow(tableOperateConfig)}
					useRequestApi={roleFindParams}
					tableDataSource={(item) => {
						return item?.data?.list || []
					}}
				/>
				{operateData.associationGroupVisible && (
					<AssociationGroup v-model={[operateData.associationGroupVisible, 'visible']} />
				)}
			</>
		)
	},
})
