import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { deepClone, isArray, isTrue } from '@/utils'
import { clone } from 'ramda'
import { microSetRouterTag } from '@/microAppMethod'

interface routerTagListOperate {
	data: ObjectMap
	type: 'add' | 'delete'
}
// const timeOutSpinning: any = 0

@Module({ store, name: 'erpLayout', namespaced: true, dynamic: true })
class Layout extends VuexModule {
	//header的数据列表
	public layoutRouterData: any[] = []
	//routerTag数据
	public routerTagList: any[] = []
	// microModel
	public microModelList: any = []
	// layout 的加载状态
	public layoutSpinning = false

	@Mutation // 设置microModelList
	public SETLAYOUTSPINNING(item: boolean) {
		// clearTimeout(timeOutSpinning)
		// // 过期重置页面
		// if (item) {
		// 	timeOutSpinning = setTimeout(() => {
		// 		this.layoutSpinning = false
		// 		message.error('页面加载失败，请重现刷新页面')
		// 	}, 3000)
		// }
		this.layoutSpinning = item
	}

	@Mutation // 设置microModelList
	public SETMICROMODELLIST(item: any[]) {
		this.microModelList = deepClone(item)
	}

	@Mutation // 重置routerTag数据
	public RESETROUTERTAGLIST(item: any[]) {
		this.routerTagList = deepClone(item)
	}

	@Mutation // 设置header的数据列表
	public SETLAYOUTROUTERDATE(item: any[]) {
		this.layoutRouterData = clone(isArray(item) ? item : [])
	}

	@Mutation // 设置路由标签列表数组
	public SETROUTERTAGLIST(item: routerTagListOperate) {
		const { data, type } = item
		if (!isTrue(data)) return
		// 添加微前端类型
		data.microType = data.microType ?? import.meta.env.VITE_MICRO_TYPE
		data.microId = data.microId ?? import.meta.env.VITE_APP_ID
		if (type === 'add') {
			if (!this.routerTagList.map((item) => item.name).includes(data.name)) {
				this.routerTagList.push(data)
			}
		} else if (type === 'delete') {
			this.routerTagList = this.routerTagList.filter((item) => data.name !== item.name)
		}

		// micro通信处理
		microSetRouterTag(item)
	}
}
export const erpLayoutModule = getModule(Layout)
