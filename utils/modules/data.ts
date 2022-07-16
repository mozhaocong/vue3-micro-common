import { includes, isNil } from 'ramda'
import { isTrue } from '@/utils'

export function ObjectToArray(object: ObjectMap) {
	return Object.keys(object).map((item) => {
		return { value: item, label: object[item] }
	})
}

export function ArrayKeyToMap(list: Array<ObjectMap>, key: string): Map<string, any> {
	const data: Map<string, any> = new Map()
	list.forEach((item) => {
		if (item[key]) {
			data.set(item[key], item)
		}
	})
	return data
}

export function ArrayKeyToObject(list: Array<ObjectMap>, key: string): ObjectMap {
	const data: ObjectMap = {}
	list.forEach((item) => {
		if (item[key]) {
			data[item[key]] = item
		}
	})
	return data
}

export function setObjetToObject(data: ObjectMap, setData: ObjectMap) {
	for (const i in data) {
		if (!isNil(setData[i])) {
			data[i] = setData[i]
		}
	}
}
// 设置递归数组
export function setArrayData(item: any[], call: (callItem: ObjectMap) => ObjectMap): ObjectMap[] {
	return item.map((res) => {
		if (isTrue(res.children)) {
			res.children = setArrayData(res.children, call)
		}
		return { ...call(res) }
	})
}

// 设置递归数组
export function forArrayData(item: any[], call: (callItem: ObjectMap) => void): void {
	item.forEach((res) => {
		call(res)
		if (isTrue(res.children)) {
			forArrayData(res.children, call)
		}
	})
}

// 过滤递归数组
export function setArrayFilter(item: any[], call: (callItem: ObjectMap) => boolean) {
	return item.filter((res: any) => {
		if (isTrue(res.children)) {
			res.children = setArrayFilter(res.children, call)
		}
		return call(res)
	})
}

// 递归数组筛选出对应的数据
export function getArrayFilterData(item: any[], call: (callItem: ObjectMap) => boolean) {
	let data: any[] = []
	item.forEach((res: any) => {
		if (call(res)) {
			data.push(res)
		}
		if (isTrue(res.children)) {
			data = [...data, ...getArrayFilterData(res.children, call)]
		}
	})
	return data
}

// 递归深拷贝
export function deepClone(source: any) {
	if (typeof source !== 'object') {
		// 非对象类型(undefined、boolean、number、string、symbol)，直接返回原值即可
		return source
	}
	if (source === null) {
		// 为null类型的时候
		return source
	}
	if (source instanceof Date) {
		// Date类型
		return new Date(source)
	}
	if (source instanceof RegExp) {
		// RegExp正则类型
		return new RegExp(source)
	}

	let result: any
	if (Array.isArray(source)) {
		// 数组
		result = []
		source.forEach((item) => {
			result.push(deepClone(item))
		})
		return result
	} else {
		// 为对象的时候
		result = {}
		const keys = [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)] // 取出对象的key以及symbol类型的key
		keys.forEach((key) => {
			const item = source[key]
			result[key] = deepClone(item)
		})
		return result
	}
}

// data = [{id:1},{id:2}] key= 'id' item=2
export function ArrayObjectIncludes(data: ObjectMap[], key: string, item: string) {
	if (!isTrue(data)) return false
	return data.map((item) => item[key]).includes(item)
}

// 对象过滤空数据
export function ObjectFilterNull(data: ObjectMap = {}) {
	const params: ObjectMap = {}
	for (const key in data) {
		if (isTrue(data[key])) {
			params[key] = data[key]
		}
	}
	return params
}
