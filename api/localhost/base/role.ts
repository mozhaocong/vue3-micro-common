import { get, post } from '@/http'
import { apiUrl } from '@/api/localhost'

export function roleFindAll(data?: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/base/role/findAll', data, options)
}
export function roleFindParams(data?: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/base/role/findParams', data, options)
}

export function roleUpdate(data?: ObjectMap, options?: ObjectMap) {
	return post(apiUrl + '/base/role/update', data, options)
}
