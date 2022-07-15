import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { has, isEmpty, isNil, map } from 'ramda'
import { isTrue, throttle } from '@/utils'
import store from '@/store'
import { getSysUserList, GetBaseCountryList, GetBaseAreaList } from '@/api/erp/user'
import { orderOrderCategories } from '@/api/erp/oms'

const throttleObject: ObjectMap = {
	getBasicSysUserListThrottle: throttle(getSysUserList),
	getBasicCategoryListThrottle: throttle(orderOrderCategories),
	getBasicNationListThrottle: throttle(GetBaseCountryList),
	getBasicAreaListThrottle: throttle(GetBaseAreaList),
}

// 做低代码优化识别
const listMapData = {
	basicSysUserList: '系统用户',
	basicNationList: '国家',
	basicAreaList: '省/州',
}

function getStoreConfig(type: string, that: any): ObjectMap {
	if (has(type + 'Config', that)) {
		return that[type + 'Config'] as any
	} else {
		return {}
	}
}

@Module({ namespaced: true, store, name: 'basicData', dynamic: true })
export class basicData extends VuexModule {
	public listMapData = listMapData //做低代码优化识别
	public basicSysUserList: Array<ObjectMap> = [] //系统用户
	private basicSysUserListConfig: ObjectMap = { value: 'id', label: 'real_name', data: ['data', 'items'] }
	public basicCategoryList: Array<ObjectMap> = [] // 订单渠道
	private basicCategoryListConfig: ObjectMap = { value: 'key', label: 'name' }
	public basicNationList: Array<ObjectMap> = [] // 国家
	private basicNationListConfig: ObjectMap = { value: 'id', label: 'format_name', data: ['data', 'result'] }
	public basicAreaList: Array<ObjectMap> = [] // 省/州
	private basicAreaListConfig: ObjectMap = { value: 'id', label: 'name', data: ['data', 'result'] }

	@Action
	public async getBasicDataList(item: { type: string; params?: ObjectMap }) {
		const { type, params = {} } = item
		const throttleName = 'get' + type.slice(0, 1).toUpperCase() + type.slice(1) + 'Throttle'
		if (has(throttleName, throttleObject)) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const res = await throttleObject[throttleName]({ size: 999, current: 1, ...params })
			if (isNil(res) || isEmpty(res)) {
				return
			}
			const typeMap = getStoreConfig(type, this)
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
			this.SETBASICDATALIST({ type, data: returnData })
		} else {
			console.error('basicData找不到' + type + '对应的接口')
			return
		}
	}

	@Mutation
	private SETBASICDATALIST(item: ObjectMap) {
		const { type, data = [] } = item
		if (has(type, this)) {
			this[type] = map((res) => {
				const label = has(type + 'Config', this)
					? (this[type + 'Config'] as ObjectMap).label
						? res[(this[type + 'Config'] as ObjectMap).label]
						: res.real_name
					: res.label
				const value = has(type + 'Config', this)
					? (this[type + 'Config'] as ObjectMap).value
						? res[(this[type + 'Config'] as ObjectMap).value]
						: res.value
					: res.value
				return {
					label: label,
					value: value,
					...res,
				}
			}, data)
		}
	}
}

export const basicDataModule = getModule(basicData)
