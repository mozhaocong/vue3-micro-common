import { get } from '@/http'
import { apiUrl } from '@/api/erp'

// 【Long】查询服务渠道信息
// GET /shipping/api/shipping_method_channels
// 接口地址：https://www.apifox.cn/web/project/995104/apis/api-29219671
export function shippingMethodChannelsList(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/shipping/api/shipping_method_channels_list', data, options)
}

// 【Long】下拉查询物流商列表
// GET /shipping/api/shipping_list
// 接口地址：https://www.apifox.cn/web/project/995104/apis/api-29153758
export function getShippingList(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/shipping/api/shipping_list', data, options)
}

// 【Long】下拉物流属性列表
// GET /shipping/api/shipping_label_list
// 接口ID：29244967
// 接口地址：https://www.apifox.cn/web/project/995104/apis/api-29244967
export function getShippingLabelList(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/shipping/api/shipping_label_list', data, options)
}

// 【Long】通过易仓派送方式
// GET /shipping/api/ecang/shippeng_methods
// 接口地址：https://www.apifox.cn/web/project/995104/apis/api-29404829
export function getEcangShippingMethods(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/shipping/api/ecang/shipping_methods', data, options)
}
