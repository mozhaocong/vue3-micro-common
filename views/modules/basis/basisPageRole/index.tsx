import { defineComponent, reactive, ref } from 'vue'
import { SimpleSearchTable } from '@/components'
import { roleFindParams } from '@/api/localhost/base/role'
import { Button } from 'ant-design-vue'
import AssociationGroup from './module/AssociationGroup'
import { isTrue } from '@/utils'
export function searchRow() {
	const data: FormRowArray = [
		{ key: 'id', title: 'ID' },
		{ key: 'roleName', title: '角色名称' },
	]
	return data
}

export function tableRow(config: ObjectMap): formTableColumnsType {
	const data: formTableColumnsType = [
		{ dataIndex: 'id', title: 'ID', width: 100, align: 'center' },
		{ dataIndex: 'roleName', title: '角色名称', width: 100, align: 'center' },
		{ dataIndex: ['groupData', 'groupName'], title: '关联群组', width: 100, align: 'center' },
		{ dataIndex: 'createdAt', title: '创建时间', width: 100, align: 'center' },
		// { dataIndex: 'updateAt', title: '更新时间', width: 100, align: 'center' },
		{
			dataIndex: 'operate',
			title: '操作',
			align: 'center',
			width: 100,
			customRender: ({ record }) => {
				const { groupData } = record
				return (
					<div>{!isTrue(groupData) && <Button onClick={() => config.associationGroup(record)}>关联群组</Button>}</div>
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
		let simpleSearchTable: ObjectMap = {}
		const record = ref({})
		const operateData = reactive({
			associationGroupVisible: false,
		})

		function onInitComplete(item: any) {
			searchForm = item.searchForm
			simpleSearchTable = item
		}

		const tableOperateConfig = {
			associationGroup: (item: any) => {
				record.value = item
				operateData.associationGroupVisible = true
			},
		}

		function onSuccess() {
			simpleSearchTable.refresh()
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
					<AssociationGroup
						v-model={[operateData.associationGroupVisible, 'visible']}
						record={record.value}
						onSuccess={onSuccess}
					/>
				)}
			</>
		)
	},
})
