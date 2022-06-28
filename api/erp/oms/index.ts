import { get } from '@/http'
import { apiUrl } from '@/api/erp'

// 查询订单渠道
export function orderOrderCategories(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/order/api/order_categories', data, options)
}
