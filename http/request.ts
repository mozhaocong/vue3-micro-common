import { isTrue } from '@/utils'

export function setConfigHeaders(): ObjectMap {
	const data = localStorage.getItem('Authorization')
	return isTrue(data) ? { Authorization: data } : {}
}
