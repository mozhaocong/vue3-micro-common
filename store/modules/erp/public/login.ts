// 定义menu模块下的，state的类型

import { apiGetPermission, authorizations } from '@/api/erp/login'
import { requestJudgment } from '@/utils'
import initRouter from '@/store/modules/erp/public/utils/initRouter'
import { loginAgain } from '@/store/modules/erp/public/utils/routerOperation'
import erpLayoutModule from '@/store/modules/erp/public/layout'

// 定义menu模块下的state
export const state: ObjectMap = {
	token: localStorage.getItem('Authorization') || '',
	owm: {},
	layoutSpinning: false,
}

// 定义menu模块下的mutations
export const mutations = {
	SetOwm(state: ObjectMap, data: ObjectMap) {
		state.owm = data
	},

	SetToken(state: ObjectMap, token: string) {
		state.token = token
		localStorage.setItem('Authorization', token)
		sessionStorage.setItem('Authorization', token)
	},
}

export const actions = {
	async appDataInit({ commit }: ObjectMap) {
		// 获取用户信息相关的数据
		const res = await apiGetPermission({})
		if (requestJudgment(res)) {
			commit('SetOwm', res.data)
			commit('SetToken', localStorage.getItem('Authorization') || '')
		}
		console.log(res)
		initRouter(res.code === 0 ? res : {})
	},

	async onLogin({ commit, dispatch }: ObjectMap, data?: ObjectMap) {
		const res: any = await authorizations(data || {})
		// commit('SetLayoutSpinning', { type: true })
		// erpLayoutModule.mutations.SetLayoutSpinning(state, { type: true, time: 2000 })
		console.log(res, 'res')
		if (!res.code) {
			commit('SetToken', res.data.token_type + ' ' + res.data.access_token)
			dispatch('appDataInit')
		}
	},

	async signOut() {
		loginAgain()
	},
}

export default {
	namespaced: true, // 声明命名空间
	state,
	actions,
	mutations,
}
