import { forEach, keys } from 'ramda'
import { crmOptObject } from '@/config/modules/business/crm'
import { omsOptObject } from '@/config/modules/business/oms'
import { basisOptObject } from '@/config/modules/business/logs'
import { shippingOptObject } from '@/config/modules/business/shipping'

export const businessOptObject: Config = {
	...crmOptObject,
	...omsOptObject,
	...basisOptObject,
	...shippingOptObject,
	baseYesNoStatus: {
		0: '否',
		1: '是',
	},
	baseStatus: {
		0: '禁用',
		1: '启用',
	},
	baseEffective: {
		0: '有效',
		1: '失效',
	},
	supplierStatus: {
		0: '待接单',
		1: '待到货',
		2: '到货中',
		3: '采购完成',
		4: '采购终止',
		5: '拒绝',
	},
	orderStatus: {
		0: '付款未完成',
		1: '付款中',
		2: '已付款',
		3: '处理中',
		4: '已发货',
		5: '已取消',
	},
}

function getOptions(data: Config): { [index: string]: Array<OptionsValue> } {
	const _obj: { [index: string]: Array<OptionsValue> } = {}
	forEach((key) => {
		const list: Array<OptionsValue> = []
		const item = data[key]
		forEach((key) => {
			const a = Number(key)
			list.push({
				value: isNaN(a) ? key : a,
				label: item[key],
			})
		}, keys(item))
		_obj[key] = list
	}, keys(data))
	return _obj
}
export const configBusinessDataOptions = getOptions(businessOptObject)
