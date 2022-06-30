import { get } from '@/http'
import { apiUrl } from '@/api/erp'
export function getSysUserList(data: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/api/users', data, options)
}
