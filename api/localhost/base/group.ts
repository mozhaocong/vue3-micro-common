import { get, post } from '@/http'
import { apiUrl } from '@/api/localhost'

export function groupFindAll(data?: ObjectMap, options?: ObjectMap) {
	return get(apiUrl + '/base/group/findAll', data, options)
}

export function groupUpdate(data?: ObjectMap, options?: ObjectMap) {
	return post(apiUrl + '/base/group/update', data, options)
}

export function groupCreate(data?: ObjectMap, options?: ObjectMap) {
	return post(apiUrl + '/base/group/create', data, options)
}
export function groupDelete(data?: ObjectMap, options?: ObjectMap) {
	return post(apiUrl + '/base/group/destroy', data, options)
}
