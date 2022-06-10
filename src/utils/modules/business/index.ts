import { configCurryFilter, configFilter } from './filter/index'
import { ref } from 'vue'
import { isObject, isTrue } from '@/utils'
export { configCurryFilter, configFilter }
// 请求成功判断
export function requestJudgment(item: ObjectMap): boolean {
	return [200, 0].includes(item.code)
}

export function asyncApiRes(Api: Promise<any>, data?: { value: any }, call?: (item: any) => void): { value: any } {
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
