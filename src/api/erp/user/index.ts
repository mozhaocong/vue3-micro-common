import { get } from '@/http'
// import { apiUrl } from '@/api/erp'
const apiUrl = 'http://erp_test.admin.htwig.com'
export function getSysUserList(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/api/users', data, options)
}
