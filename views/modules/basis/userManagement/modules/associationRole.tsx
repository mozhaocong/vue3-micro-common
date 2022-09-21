import { defineComponent, PropType, reactive, ref } from 'vue'
import { SimpleSearchTable } from '@/components'
import { roleFindParams } from '@/api/localhost/base/role'
import { searchRow, tableRow } from '@/views/modules/basis/basisPageRole'
import { Modal, Button } from 'ant-design-vue'
import { deepClone, editApiRequest } from '@/utils'
import { userUpdate } from '@/api/localhost/base/user'

const Props = {
	record: { type: Object as PropType<ObjectMap>, required: true },
} as const

export default defineComponent({
	emits: ['update:visible'],
	props: Props,
	setup(props, { emit }) {
		const { roleList } = props.record
		const roleListId = roleList.map((item: any) => item.id)
		const loading = ref(false)
		const tableOperateConfig: ObjectMap = {
			associationGroup: (item: any) => {
				record.value = item
				operateData.associationGroupVisible = true
			},
		}
		const searchRowData = searchRow()
		const tableRowData = tableRow(tableOperateConfig)
		tableRowData.forEach((item: any) => {
			if (item.dataIndex === 'operate') {
				item.customRender = ({ record }: any) => {
					console.log('roleListId', roleListId, record.id)
					return (
						<div>
							{roleListId.includes(record.id) ? (
								<Button loading={loading.value} onClick={() => associationClick(record)}>
									移除角色
								</Button>
							) : (
								<Button loading={loading.value} onClick={() => associationClick(record)}>
									关联角色
								</Button>
							)}
						</div>
					)
				}
			}
		})
		console.log('tableRowData', tableRowData)

		async function associationClick(record: any) {
			const params = deepClone(props.record)
			params.roleList.push(record)
			const res = await editApiRequest({
				api: () => userUpdate(params),
				setMethod: (item) => {
					loading.value = item
				},
			})
			console.log(res)
		}

		let simpleSearchTable: ObjectMap = {}
		const record = ref({})
		const operateData = reactive({
			associationGroupVisible: false,
		})

		function onInitComplete(item: any) {
			simpleSearchTable = item
		}

		function onCancel() {
			emit('update:visible', false)
		}
		return () => (
			<Modal title={'添加'} visible={true} onCancel={onCancel} width={'80vw'}>
				<SimpleSearchTable
					isCustomRow={false}
					pageKey="userAssociationRole"
					onInitComplete={onInitComplete}
					searchRow={searchRowData}
					tableRow={tableRowData}
					useRequestApi={roleFindParams}
					tableDataSource={(item) => {
						return item?.data?.list || []
					}}
				/>
			</Modal>
		)
	},
})
