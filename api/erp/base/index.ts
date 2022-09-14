import { get } from '@/http'
import { apiUrl } from '@/api/erp'

// 【Long】下拉查询货币列表
// GET /base/api/currency_list
// 接口地址：https://www.apifox.cn/web/project/995104/apis/api-28500616
export function currencyList(data = {}, options?: ObjectMap) {
	return get(apiUrl + '/base/api/currency_list', data, options)
}
export function baseCountry(data = {}, options?: ObjectMap) {
	return get(apiUrl + '/base/api/country', data, options)
}
