// 定义menu模块下的，state的类型

import { apiGetPermission, authorizations } from '@/api/erp/login'
import { requestJudgment } from '@/utils'
import initRouter from '@/store/modules/erp/public/utils/initRouter'
import { loginAgain } from '@/store/modules/erp/public/utils/routerOperation'

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
		// // 获取用户信息相关的数据
		// let res: any = {}
		// function initData(res: any) {
		// 	commit('SetOwm', res.data)
		// 	commit('SetToken', localStorage.getItem('Authorization') || '')
		// }
		// if (import.meta.env.VITE_MICRO_TYPE === 'ViteMain') {
		// 	res = await apiGetPermission({})
		// 	if (requestJudgment(res)) {
		// 		initData(res)
		// 		localStorage.setItem('owm', JSON.stringify(res))
		// 	}
		// } else {
		// 	const data = localStorage.getItem('owm')
		// 	if (data) {
		// 		try {
		// 			initData(JSON.parse(data))
		// 			res = JSON.parse(data)
		// 		} catch (e) {
		// 			console.error('apiGetPermission JSON错误', e)
		// 		}
		// 	}
		// }
		//
		// console.log('appDataInit', res)
		// await initRouter(res.code == 0 ? res : {})
		// commit('erpLayout/SetLayoutSpinning', { type: false }, { root: true })

		// 获取用户信息相关的数据
		const res = await apiGetPermission({})
		if (requestJudgment(res)) {
			commit('SetOwm', res.data)
			commit('SetToken', localStorage.getItem('Authorization') || '')
		}
		initRouter(res.code === 0 ? res : {})
		commit('erpLayout/SetLayoutSpinning', { type: false }, { root: true })
	},

	async onLogin({ commit, dispatch }: ObjectMap, data?: ObjectMap) {
		commit('erpLayout/SetLayoutSpinning', { type: true }, { root: true })
		const res: any = await authorizations(data || {})
		if (!res.code) {
			commit('SetToken', res.data.token_type + ' ' + res.data.access_token)
			dispatch('appDataInit')
		} else {
			commit('erpLayout/SetLayoutSpinning', { type: false }, { root: true })
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
