import { post, get } from '@/http'
import { erpUrl } from '@/api/erp'
export function authorizations(data: ObjectMap, options?: ObjectMap) {
	return post(erpUrl + '/api/authorizations', data, options)
}

export function apiGetPermission(data: ObjectMap, options?: ObjectMap) {
	return get(erpUrl + '/api/own', data, options)
}
