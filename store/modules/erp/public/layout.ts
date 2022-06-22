// menu.ts

import { message } from 'ant-design-vue'
import { deepClone, isArray, isTrue } from '@/utils'
import { clone } from 'ramda'
import { microSetRouterTag } from '@/microAppMethod'

// 定义menu模块下的，state的类型
export type MenuState = {
	count: number
}

interface routerTagListOperate {
	data: ObjectMap
	type: 'add' | 'delete'
	isAdd?: boolean
}
let timeOutSpinning: any = 0

// 定义menu模块下的state
export const state: ObjectMap = {
	//routerData的数据列表
	layoutRouterData: [],
	//header选中key
	headerSelectedKey: '',
	//侧边栏选中key
	sidebarSelectedKey: '',
	//侧边栏数据列表
	sidebarList: [],
	//routerTag选中key
	routerTagKey: '',
	//routerTag数据
	routerTagList: [],
	// microModel
	microModelList: [],
	// layout 的加载状态
	layoutSpinning: false,
}

// 定义menu模块下的mutations
export const mutations = {
	setCount(state: MenuState, count: number): void {
		state.count = count
	},
	//设置microModelList
	SetLayoutSpinning(state: ObjectMap, { type = false, time = 10000 }) {
		clearTimeout(timeOutSpinning)
		// 过期重置页面
		if (type && time) {
			timeOutSpinning = setTimeout(() => {
				state.layoutSpinning = false
				message.error('页面加载失败，请重现刷新页面')
			}, time)
		}
		state.layoutSpinning = type
	},

	// 设置侧边栏数据列表
	SetHeaderSelectedKey(state: ObjectMap, item: string) {
		state.headerSelectedKey = item
	},

	// 设置侧边栏Key
	SetSidebarSelectedKey(state: ObjectMap, item: string) {
		state.sidebarSelectedKey = item
	},

	// 设置侧边栏数据列表
	SetSidebarList(state: ObjectMap, item: any[]) {
		state.sidebarList = deepClone(item)
	},

	// 设置routerTagKey选中key
	SetRouterTagKey(state: ObjectMap, item: string) {
		state.routerTagKey = item
	},

	// 设置microModelList
	SetMicroModeList(state: ObjectMap, item: any[]) {
		state.microModelList = deepClone(item)
	},

	// 重置routerTag数据
	ResetRouterTagList(state: ObjectMap, item: any[]) {
		state.routerTagList = deepClone(item)
	},

	// 设置header的数据列表
	SetLayoutRouterDate(state: ObjectMap, item: any[]) {
		state.layoutRouterData = clone(isArray(item) ? item : [])
	},

	AddDeleteRouterTagList(state: ObjectMap, item: routerTagListOperate) {
		const { data, type, isAdd = false } = item
		if (!isTrue(data)) return
		// 添加微前端类型 用来微前端判断
		data.microType = data.microType ?? import.meta.env.VITE_MICRO_TYPE
		data.microId = data.microId ?? import.meta.env.VITE_APP_ID
		if (type === 'add') {
			if (!state.routerTagList.map((item: any) => item.path).includes(data.path) || isAdd) {
				const pushData = deepClone(state.routerTagList)
				pushData.push(data)
				state.routerTagList = pushData
			} else {
				return
			}
		} else if (type === 'delete') {
			state.routerTagList = state.routerTagList.filter((item: any) => data.path !== item.path)
		}

		// micro通信处理
		microSetRouterTag(item)
	},
}

export default {
	namespaced: true, // 声明命名空间
	state,
	mutations,
}
