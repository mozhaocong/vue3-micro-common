import { get } from '@/http'
import { apiUrl } from '@/api/localhost'

export function roleFindAll(data?: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/base/role/findAll', data, options)
}
