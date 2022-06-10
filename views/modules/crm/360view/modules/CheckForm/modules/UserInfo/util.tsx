export class BasicInfo {
	data: FormRowArray
	constructor() {
		this.data = [
			{
				title: 'Name',
				key: 'first_name',
				customRender: ({ record }) => {
					return (record.first_name || '') + (record.last_name || '')
				},
			},
			{ title: '是否验证邮箱', key: 'verified_email_name' },
			{ title: '创建时间', key: 'plat_created_time' },
			{ title: '关联FB账号', key: 'facebook' },
			{ title: '所属品牌', key: 'category_name' },
			{ title: '是否激活邮箱', key: 'shopify_actived_name' },
			{ title: '激活日期', key: 'null' },
			{ title: '关联Google账号', key: 'google' },
			{ title: '联系电话', key: 'phone' },
			{ title: '是否订阅邮箱', key: 'subscribed_email_name' },
			{ title: '生日日期', key: 'birthday' },
			{ title: '关联WhatsApp', key: 'whats_app' },
			{ title: '会员类型', key: 'null' },
			{ title: '关联INS', key: 'instagram' },
		]
	}
}
