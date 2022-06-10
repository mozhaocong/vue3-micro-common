export class FormRow {
	data: FormRowArray
	constructor() {
		this.data = [
			{ title: '礼品卡Code', key: 'code' },
			{ title: '礼品卡价值', key: 'initial_value' },
			{ title: '有效期', key: 'expires_on' },
			{ title: '所属客户', key: 'customer' },
			{ title: '备注', key: 'order_no' },
		]
	}
}
