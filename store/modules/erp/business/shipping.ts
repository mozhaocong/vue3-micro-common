import { isTrue, throttle } from '@/utils'
import { has, isEmpty, isNil, map } from 'ramda'
import {
	getEcangShippingMethods,
	getShippingLabelList,
	getShippingList,
	shippingMethodChannelsList,
} from '@/api/erp/shipping'

const throttleObject: ObjectMap = {
	[`getShippingChannelsListThrottle`]: throttle(shippingMethodChannelsList),
	[`getShippingListThrottle`]: throttle(getShippingList),
	[`getShippingLabelListThrottle`]: throttle(getShippingLabelList),
	[`getEcangShippingMethodsListThrottle`]: throttle(getEcangShippingMethods),
}

// 做低代码优化识别
const listMapData = {
	shippingChannelsList: '渠道',
	shippingList: '物流商列表',
	shippingLabelList: '物流属性',
	ecangShippingMethods: '易仓派送方式',
}

// 定义menu模块下的state
export const state: ObjectMap = {
	listMapData: listMapData,
	shippingChannelsList: [], //系统用户
	shippingChannelsListConfig: { value: 'id', label: 'name' },
	shippingList: [], //物流商列表
	shippingListConfig: { value: 'id', label: 'name' },
	shippingLabelList: [], //物流属性
	shippingLabelListConfig: { value: 'id', label: 'name' },
	ecangShippingMethodsList: [], //易仓派送方式
	ecangShippingMethodsListConfig: { value: 'sm_code', label: 'sm_name_cn', data: ['data', 'data'] },
}

const modelKey = 'shipping'
function getStoreConfig(type: string, that: any): ObjectMap {
	if (has(type + 'Config', that)) {
		return that[type + 'Config'] as any
	} else {
		return {}
	}
}
// 定义menu模块下的mutations

export const mutations = {
	SetBasicDataList(state: ObjectMap, item: ObjectMap) {
		const { type, data = [] } = item
		if (has(type, state)) {
			state[type] = map((res) => {
				const label = has(type + 'Config', state)
					? (state[type + 'Config'] as ObjectMap).label
						? res[(state[type + 'Config'] as ObjectMap).label]
						: res.real_name
					: res.label
				const value = has(type + 'Config', state)
					? (state[type + 'Config'] as ObjectMap).value
						? res[(state[type + 'Config'] as ObjectMap).value]
						: res.value
					: res.value
				return {
					label: label,
					value: value,
					...res,
				}
			}, data)
		}
	},
}

export const actions = {
	async getBasicDataList({ commit, state }: ObjectMap, item: { type: string; params?: ObjectMap }) {
		const { type, params = {} } = item
		const throttleName = 'get' + type.slice(0, 1).toUpperCase() + type.slice(1) + 'Throttle'
		if (has(throttleName, throttleObject)) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const res = await throttleObject[throttleName]({ size: 999, current: 1, ...params })
			if (isNil(res) || isEmpty(res)) {
				return
			}
			const typeMap = getStoreConfig(type, state)
			let returnData = res?.data?.result
			if (isTrue(typeMap.data)) {
				let forData = res
				try {
					typeMap.data.forEach((forRes: any) => {
						forData = forData[forRes]
					})
					returnData = forData
				} catch (e) {
					console.warn(`${modelKey} getBasicDataList 配置报错`, typeMap)
				}
			}
			commit('SetBasicDataList', { type, data: returnData })
		} else {
			console.error(`${modelKey}Data找不到` + type + '对应的接口')
			return
		}
	},
}

export default {
	namespaced: true, // 声明命名空间
	state,
	mutations,
	actions,
}
