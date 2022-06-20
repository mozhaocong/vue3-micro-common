import { get, methodType } from '@/http'
import { apiUrl } from '@/api/erp'

// 查询订单列表
export function orderApiOrder(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/order/api/orders', data, options)
}

// 查询订单详情
export function orderApiOrdersId(id: any, method: string, data?: ObjectMap, options?: ObjectMap) {
	return methodType(apiUrl + '/order/api/orders/' + id, method, data, options)
}

// 查询发货订单列表
export function orderOutRepoOrders(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/order/api/out_repo_orders', data, options)
}

// 发货订单详情
export function orderOutRepoOrdersId(id: any, method: string, data?: ObjectMap, options?: ObjectMap) {
	return methodType(apiUrl + '/order/api/out_repo_orders/' + id, method, data, options)
}

// 物流列表
export function orderShippingDeclareOrders(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/order/api/declare_orders', data, options)
}

// 物流列表详情
export function orderShippingIdDeclareOrders(id: string, method: string, data?: ObjectMap, options?: ObjectMap) {
	return methodType(apiUrl + '/order/api/declare_orders/' + id, method, data, options)
}

// 查询费用列表
export function orderShippingOrderMoneys(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/order/api/moneys', data, options)
}

// 查询退货列表
export function orderReturnProductOrders(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/order/api/return_product_orders', data, options)
}

// 查询退货详情
export function orderReturnIdProductOrders(id: string, method: string, data?: ObjectMap, options?: ObjectMap) {
	return methodType(apiUrl + '/order/api/return_product_orders/' + id, method, data, options)
}
