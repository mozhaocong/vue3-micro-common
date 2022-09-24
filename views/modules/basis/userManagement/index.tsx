import { defineComponent, reactive, ref } from 'vue'
import { SimpleSearchTable } from '@/components'
import { Button } from 'ant-design-vue'
import { isTrue } from '@/utils'
import { userFindParams } from '@/api/localhost/base/user'
import AssociationRole from './modules/associationRole'
function searchRow() {
	const data: FormRowArray = [
		{ key: 'id', title: 'ID' },
		{ key: 'name', title: '用户名称' },
		{ key: 'email', title: '用户邮箱' },
	]
	return data
}

function tableRow(config: ObjectMap): formTableColumnsType {
	const data: formTableColumnsType = [
		{ dataIndex: 'id', title: 'ID', width: 100, align: 'center' },
		{ dataIndex: 'email', title: '用户邮箱', width: 100, align: 'center' },
		{ dataIndex: 'name', title: '用户名称', width: 100, align: 'center' },
		{ dataIndex: 'createdAt', title: '创建时间', width: 100, align: 'center' },
		{ dataIndex: 'updateAt', title: '更新时间', width: 100, align: 'center' },
		{
			dataIndex: 'operate',
			title: '操作',
			align: 'center',
			width: 100,
			customRender: ({ record }) => {
				const { groupData } = record
				return (
					<div>{!isTrue(groupData) && <Button onClick={() => config.associationRole(record)}>关联角色</Button>}</div>
				)
			},
		},
	]
	return data
}

export default defineComponent({
	name: 'userManagement',
	setup() {
		let simpleSearchTable: ObjectMap = {}
		const record = ref({})

		const operateData = reactive({
			associationRoleVisible: false,
		})

		function onInitComplete(item: any) {
			simpleSearchTable = item
		}

		const tableOperateConfig = {
			associationRole: (item: any) => {
				record.value = item
				operateData.associationRoleVisible = true
			},
		}

		function associationSuccess() {
			simpleSearchTable.refresh()
		}

		return () => (
			<>
				{operateData.associationRoleVisible && (
					<AssociationRole
						v-model={[operateData.associationRoleVisible, 'visible']}
						record={record.value}
						onSuccess={associationSuccess}
					/>
				)}
				<SimpleSearchTable
					pageKey="userManagement"
					onInitComplete={onInitComplete}
					searchRow={searchRow()}
					tableRow={tableRow(tableOperateConfig)}
					useRequestApi={userFindParams}
					tableDataSource={(item) => {
						return item?.data?.list || []
					}}
				/>
			</>
		)
	},
})
