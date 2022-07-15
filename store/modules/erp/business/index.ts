import { isTrue, throttle } from '@/utils'
import { GetBaseAreaList, GetBaseCountryList, getSysUserList } from '@/api/erp/user'
import { orderOrderCategories } from '@/api/erp/oms'
import { has, isEmpty, isNil, map } from 'ramda'
import { currencyList } from '@/api/erp/base'

const throttleObject: ObjectMap = {
	getBasicSysUserListThrottle: throttle(getSysUserList),
	getBasicCategoryListThrottle: throttle(orderOrderCategories),
	getBasicNationListThrottle: throttle(GetBaseCountryList),
	getBasicAreaListThrottle: throttle(GetBaseAreaList),
	getBasicCurrencyListThrottle: throttle(currencyList),
}

// 做低代码优化识别
const listMapData = {
	basicSysUserList: '系统用户',
	basicNationList: '国家',
	basicAreaList: '省/州',
	basicCurrencyList: '币种',
}

// 定义menu模块下的state
export const state: ObjectMap = {
	listMapData: listMapData,
	basicSysUserList: [], //系统用户
	basicSysUserListConfig: { value: 'old_user_id', label: 'real_name', data: ['data', 'items'] },
	basicCategoryList: [], // 订单渠道
	basicCategoryListConfig: { value: 'key', label: 'name' },
	basicNationList: [], // 国家
	basicNationListConfig: { value: 'id', label: 'format_name', data: ['data', 'result'] },
	basicAreaList: [], // 省/州
	basicAreaListConfig: { value: 'id', label: 'name', data: ['data', 'result'] },
	basicCurrencyList: [], // 币种
	basicCurrencyListConfig: { value: 'id', label: 'name', data: ['data', 'result'] },
}

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
		console.log(item)
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
					console.warn('getBasicDataList 配置报错', typeMap)
				}
			}
			commit('SetBasicDataList', { type, data: returnData })
		} else {
			console.error('basicData找不到' + type + '对应的接口')
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
