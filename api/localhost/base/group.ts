import { get } from '@/http'
import { apiUrl } from '@/api/localhost'

export function groupFindAll(data?: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/base/group/findAll', data, options)
}
