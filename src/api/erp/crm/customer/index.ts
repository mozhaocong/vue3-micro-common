import { get, methodType } from '@/http'
import { apiUrl } from '@/api/erp'
export function customer(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/customer/api/customer', data, options)
}

export function customerDetails(id: string, method: string, data?: ObjectMap, options?: ObjectMap) {
	return methodType(apiUrl + '/customer/api/customer/' + id, method, data, options)
}

export function customerGiftCard(data?: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/customer/api/customer_gift_card', data, options)
}

export function giftCardDetails(id: string, method: string, data?: ObjectMap, options?: ObjectMap) {
	return methodType(apiUrl + '/customer/api/customer_gift_card/' + id, method, data, options)
}
// 查询用户订单列表
export function customerCardCustomerOrder(id: string, method: string, data?: ObjectMap, options?: ObjectMap) {
	return methodType(apiUrl + '/customer/api/customer_order/' + id, method, data, options)
}
// 查询退款列表
export function customerRefundOrder(id: string, method: string, data?: ObjectMap, options?: ObjectMap) {
	return methodType(apiUrl + '/customer/api/customer_refund_order/' + id, method, data, options)
}
