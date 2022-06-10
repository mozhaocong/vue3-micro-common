import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { has, isEmpty, isNil, map } from 'ramda'
import { throttle } from '@/utils'
import store from '@/store'
import { getSysUserList } from '@/api/erp/user'

const throttleObject: ObjectMap = {
	getBasicSysUserListThrottle: throttle(getSysUserList),
}

// 做低代码优化识别
const listMapData = {
	basicSysUserList: '系统用户',
}

@Module({ namespaced: true, store, name: 'basicData', dynamic: true })
export class basicData extends VuexModule {
	public listMapData = listMapData //做低代码优化识别
	public basicSysUserList: Array<ObjectMap> = [] //系统用户
	private basicSysUserListConfig: ObjectMap = { value: 'old_user_id', label: 'real_name' }

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
			this.SETBASICDATALIST({ type, data: res?.data?.items })
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
