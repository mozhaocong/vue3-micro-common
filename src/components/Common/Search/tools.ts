import { forEach, isEmpty, is } from 'ramda'

export function chunk<T>(array: Array<T>, size: number) {
	size = Math.max(size, 0)
	const length = array == null ? 0 : array.length
	if (!length || size < 1) {
		return []
	}
	let index = 0
	let resIndex = 0
	const result: Array<Array<T>> = new Array(Math.ceil(length / size))

	while (index < length) {
		result[resIndex++] = array.slice(index, (index += size))
	}
	return result
}

export function isString(value: any): value is string {
	return is(String, value)
}

interface keyDto<T> {
	(item: T): string
}
export function makeMap<T extends Record<string, any>>(list: Array<T>, key: keyof T | keyDto<T>) {
	const _map: Map<string, T> = new Map()

	if (isEmpty(list)) {
		return _map
	}

	forEach((item) => {
		isString(key) ? _map.set(item[key], item) : _map.set((key as keyDto<T>)(item), item)
	}, list)
	return _map
}
