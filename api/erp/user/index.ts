import { get } from '@/http'
import { erpUrl } from '@/api/erp'
export function getSysUserList(data: ObjectMap, options?: ObjectMap) {
	return get(erpUrl + '/api/users', data, options)
}
