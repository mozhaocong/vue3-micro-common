import { ArrayKeyToMap, isFunction, isTrue } from '@/utils'

export function columnsSetArrayDiffArray(source: any[], comparison: any[]) {
	const sourceObject = ArrayKeyToMap(source, 'key')
	const returnData: any[] = []
	const returnComparison: any[] = []
	comparison.forEach((item) => {
		const data = sourceObject.get(item.key)
		if (isTrue(data)) {
			if (item.show) {
				returnData.push(data)
			}
			sourceObject.delete(item.key)
			returnComparison.push(item)
		}
	})
	if (sourceObject.size) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [key, value] of sourceObject) {
			returnData.push(value)
			returnComparison.push(setCustomRow(value))
		}
	}
	return { columns: returnData, customRow: returnComparison }
}
let sort = 1000
export function setCustomRow(item: ObjectMap, setData = {}) {
	return {
		key: item.dataIndex ?? item.key,
		title: item.title,
		sort: sort++,
		required: item.required ?? false,
		show: true,
		colSpan: item.colSpan ?? 6,
		...setData,
	}
}

// 判断类型是不是函数
export function isFunctionOfOther(value: any, callValue: ObjectMap = {}) {
	if (isTrue(value)) {
		if (isFunction(value)) {
			return value(callValue) as any
		} else {
			return value
		}
	} else {
		return ''
	}
}
