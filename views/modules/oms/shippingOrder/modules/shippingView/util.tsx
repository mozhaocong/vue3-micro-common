export class basicInformation {
	// 发货订单基础信息
	data: FormRowArray
	constructor(formModel?: ObjectMap) {
		this.data = [
			{ title: '发货订单号', key: 'no' },
			{ title: '出库状态', key: 'status_name' },
			{ title: '订单属性', key: 'property_type_name' },
			{ title: '系统创建时间', key: 'created_at' },
			{ title: '订单类型', key: 'type_name' },
			{ title: '订单渠道', key: 'category_name' },
			{ title: '操作类型', key: 'picking_type_name' },
			{ title: '发货方式', key: 'delivery_type_name' },
			{ title: '产品出库类型', key: '' },
			{ title: '合并订单', key: '' },
			{ title: '关联礼包规则', key: 'gift_rule_name' },
			{ title: '客服备注', key: 'salesman_note' },
		]
	}
}
export class OutboundInformation {
	// 出库信息
	data: FormRowArray
	constructor(formModel?: ObjectMap) {
		this.data = [
			{ title: '发货仓库(国内)', key: 'delivery_repo_name' },
			{ title: '发货仓库（海外)', key: 'oversea_delivery_repo_name' },
			{ title: '收货仓库（海外)', key: 'receive_repo_name' },
			{ title: '分拣员', key: 'picking_user_name' },
			{ title: '分拣完成时间', key: 'picking_completed_time' },
			{ title: '复核员', key: 'distribution_user_name' },
			{ title: '复核完成时间', key: 'distribution_completed_time' },
			{ title: '打包员', key: 'pack_user_name' },
			{ title: '打包完成时间', key: 'pack_completed_time' },
			{ title: '签出员', key: 'deliveried_user_name' },
			{ title: '签出完成时间', key: 'deliveried_completed_time' },
			{ title: '物流商', key: 'shipper_name' }, // 承运商?
			{ title: '派送方式', key: 'shipper_method_name' },
			{ title: '运单号', key: 'shipping_no' },
			{ title: '订单实际重量', key: 'real_weight' },
			{ title: '订单毛重', key: 'gross_weight' },
			{ title: '订单净重', key: 'net_weight' },
		]
	}
}

export class productInformation {
	// 出库产品信息
	data: tableColumnsType
	constructor(operationClick?: any) {
		this.data = [
			// { title: '序号', dataIndex: 'null1', align: 'center', width: 150 },
			{ title: '仓库SKU【新赫特码】', dataIndex: 'product_new_reference_no', align: 'center', width: 150 },
			{ title: '产品类型', dataIndex: 'product_type_name', align: 'center', width: 150 },
			{ title: '出库数量', dataIndex: 'num', align: 'center', width: 150 },
			{ title: '出库库位', dataIndex: '', align: 'center', width: 150 },
			{ title: '产品备注', dataIndex: 'note', align: 'center', width: 150 },
		]
	}
}
