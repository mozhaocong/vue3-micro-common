import { configCurryFilter, configFilter } from './filter/index'
import { ref } from 'vue'
import { isArray, isObject, isTrue } from '@/utils'
export { configCurryFilter, configFilter }
// 请求成功判断
export function requestJudgment(item: ObjectMap): boolean {
	return [200, 0].includes(item.code)
}

export function asyncApiRes(Api: Promise<any>, data?: { value?: any }, call?: (item: any) => void): { value: any } {
	const returnData = ref()
	Api.then((item) => {
		if (requestJudgment(item)) {
			if (isTrue(data) && isObject(data) && isObject(item.data.result)) {
				data.value = item.data.result
			}
			returnData.value = item
			if (call) {
				call(item)
			}
		}
	})
	return returnData
}

export function routeToRouterTagListData(route: ObjectMap) {
	const meta = JSON.parse(JSON.stringify(route.meta || ''))
	const name = JSON.parse(JSON.stringify(route.name || ''))
	const path = JSON.parse(JSON.stringify(route.fullPath || ''))
	const title = JSON.parse(JSON.stringify(route?.meta?.title || ''))
	return { meta, name, path, title }
}

export function searchDataProcessing(data: ObjectMap = {}) {
	const returnData: ObjectMap = {}
	for (const key in data) {
		if (isArray(data[key])) {
			returnData[key] = data[key].join(',')
		} else {
			returnData[key] = data[key]
		}
	}
	return returnData
}
