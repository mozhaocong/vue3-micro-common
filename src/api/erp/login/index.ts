import { post, get } from '@/http'
// import { apiUrl } from '@/api/erp'
const apiUrl = 'http://erp_test.admin.htwig.com'
export function authorizations(data: ObjectMap, options?: ObjectMap) {
	return post(apiUrl + '/api/authorizations', data, options)
}

export function apiGetPermission(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/api/own', data, options)
}
