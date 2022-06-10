import { businessOptObject } from '@/config'
import { isObject } from '@/utils'
import { has, curry } from 'ramda'
// import { BasicDataModule } from '@/store/modules/basicData'

type Key = string | number | ObjectMap

export const configFilter = (prop: string, key: Key) => {
	if (isObject(key)) {
		key = key.text
	}
	if (has(prop, businessOptObject)) {
		return businessOptObject[prop][key as string]
	}
	return key
}

// export const basicFilter = function (prop: string, key: Key) {
// 	if (isRableSlotScope(key)) {
// 		key = key.text
// 	}
// 	if (isEmpty(BasicDataModule.sysUserList)) {
// 		BasicDataModule.getSysUserList()
// 		return key
// 	}
//
// 	if (isEmpty(BasicDataModule[prop as 'sysUserList'])) {
// 		const Action = ('get' + prop.slice(0, 1).toUpperCase() + prop.slice(1)) as 'getCountyList' | 'getPlatformList'
// 		BasicDataModule[Action]()
// 	}
//
// 	const data = BasicDataModule[prop as 'sysUserList'].find((item: any) => equals(item.value, key))
// 	if (data) {
// 		return data.label
// 	}
// 	return key
// }

export const configCurryFilter = curry(configFilter)
