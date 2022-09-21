import { get, post } from '@/http'
import { apiUrl } from '@/api/localhost'

export function userFindParams(data?: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/base/user/findParams', data, options)
}
export function userUpdate(data?: ObjectMap, options?: ObjectMap) {
	return post(apiUrl + '/base/user/update', data, options)
}
