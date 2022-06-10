import { configCurryFilter } from '@/utils'
import { FormConfig } from '@/components'
import { Button } from 'ant-design-vue'
import { serialNumber } from '@/utils/modules/tools/common'

export class SearchRow {
	data: FormRowArray
	constructor() {
		this.data = [
			{
				title: '用户邮箱',
				key: 'email',
			},
			{
				title: '品牌店铺',
				key: 'category',
				component: <FormConfig />,
				props: {
					prop: 'crmCategory',
				},
			},
		]
	}
}

export class TableRow {
	data: tableColumnsType
	constructor(operationConfig?: any) {
		this.data = [
			{
				title: '序号',
				dataIndex: 'no',
				customRender: (item) => serialNumber(item, operationConfig.tableData),
			},
			{
				title: '用户邮箱',
				dataIndex: 'email',
			},
			{
				title: '姓名',
				dataIndex: 'first_name',
				customRender: ({ record }) => {
					return record.first_name + record.last_name
				},
			},
			{
				title: '所属品牌店铺',
				dataIndex: 'category_name',
				customRender: configCurryFilter('crmCategory'),
			},
			{
				title: '是否验证邮箱',
				dataIndex: 'verified_email_name',
			},
			{
				title: '邮件订阅',
				dataIndex: 'subscribed_email_name',
			},
			{
				title: '会员类型',
				dataIndex: 'is_paid_member_name',
			},
			{
				title: '总订单量',
				dataIndex: 'order_num',
			},
			{
				title: '总贡献金额',
				dataIndex: 'order_money',
			},
			{
				title: '操作',
				dataIndex: 'operation',
				customRender: ({ record }) => {
					return (
						<div>
							<Button
								onClick={() => {
									operationConfig.setModuleData({
										record: record,
									})
									operationConfig.setModuleState({ checkForm: true })
								}}
							>
								查看
							</Button>
						</div>
					)
				},
			},
		]
	}
}
