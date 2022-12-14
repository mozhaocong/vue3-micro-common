import { isNumber, isObject, isTrue } from '@/utils'
import dayjs from 'dayjs'

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

// data = [{id:1},{id:2}] key= 'id' item=2
export function ArrayObjectIncludes(data: ObjectMap[], key: string, item: string): boolean {
	if (!isTrue(data)) return false
	return data.map((item) => item[key]).includes(item)
}

// 对象过滤空数据
export function ObjectFilterNull(data: ObjectMap = {}): ObjectMap {
	const params: ObjectMap = {}
	for (const key in data) {
		if (isTrue(data[key])) {
			params[key] = data[key]
		}
	}
	return params
}

// 数据数字转字符串
export function dataNumberToString(source: any) {
	if (typeof source !== 'object') {
		if (isNumber(source)) {
			return source + ''
		}
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
			result.push(dataNumberToString(item))
		})
		return result
	} else {
		// 为对象的时候
		result = {}
		const keys = [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)] // 取出对象的key以及symbol类型的key
		keys.forEach((key) => {
			const item = source[key]
			console.log('item', item)
			result[key] = dataNumberToString(item)
		})
		return result
	}
}

export function setTreeData(item: {
	data: ObjectMap[]
	idKey?: string
	pidKey?: string
	childrenName?: string
	setPushHooks?: (father: ObjectMap, children: any[]) => void
}) {
	const { data, idKey = 'id', pidKey = 'pId', childrenName = 'children', setPushHooks } = item
	return data.filter((father) => {
		const children = data.filter((item) => item[pidKey] === father[idKey])
		if (isTrue(setPushHooks) && isTrue(children)) {
			// @ts-ignore
			setPushHooks(father, children)
		}
		father[childrenName] = children && children.length ? children : ''
		return data.every((e) => e[idKey] != father[pidKey])
	})
}
