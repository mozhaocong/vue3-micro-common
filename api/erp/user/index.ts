import { get } from '@/http'
import { erpUrl, apiUrl } from '@/api/erp'
export function getSysUserList(data: ObjectMap, options?: ObjectMap) {
	return get(erpUrl + '/api/users', data, options)
}

// 下拉查询国家管理列表 base/api/country_list
export function GetBaseCountryList(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/base/api/country_list', data, options)
}

// 下拉查询省/州列表 base/api/area_list
export function GetBaseAreaList(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/base/api/area_list', data, options)
}

// 查询产品属性 / product/api/product_attributes
export function GetProductAttributes(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/product/api/product_attributes', data, options)
}

// 查询一级产品属性 / product/api/product_attributes
export function GetProductFirstAttributes(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/product/api/product_first_attributes', data, options)
}
