import { configCurryFilter, configFilter } from './filter/index'
import { ref } from 'vue'
import { isObject, isTrue } from '@/utils'
import { clone } from 'ramda'
export { configCurryFilter, configFilter }
// 请求成功判断
export function requestJudgment(item: ObjectMap): boolean {
	return [200, 0].includes(item.code)
}

export function asyncApiRes(Api: Promise<any>, data?: { value?: any }, call?: (item: any) => void): { value: any } {
	const returnData = ref()
	Api.then((item) => {
		if (requestJudgment(item)) {
			if (isTrue(data) && isObject(data) && isObject(item.data)) {
				data.value = item.data
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
