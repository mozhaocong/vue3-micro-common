import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { deepClone, isArray, isTrue } from '@/utils'
import { clone } from 'ramda'
import { microSetRouterTag } from '@/microAppMethod'
import { message } from 'ant-design-vue'

interface routerTagListOperate {
	data: ObjectMap
	type: 'add' | 'delete'
	isAdd?: boolean
}
let timeOutSpinning: any = 0

@Module({ name: 'erpLayout', namespaced: true })
class Layout extends VuexModule {
	//routerData的数据列表
	public layoutRouterData: any[] = []
	//header选中key
	public headerSelectedKey = ''
	//侧边栏选中key
	public sidebarSelectedKey = ''
	//侧边栏数据列表
	public sidebarList: any[] = []
	//routerTag选中key
	public routerTagKey = ''
	//routerTag数据
	public routerTagList: any[] = []
	// microModel
	public microModelList: any = []
	// layout 的加载状态
	public layoutSpinning = false

	@Mutation // 设置microModelList
	public SetLayoutSpinning({ type = false, time = 10000 }) {
		clearTimeout(timeOutSpinning)
		// 过期重置页面
		if (type && time) {
			timeOutSpinning = setTimeout(() => {
				this.layoutSpinning = false
				message.error('页面加载失败，请重现刷新页面')
			}, time)
		}
		this.layoutSpinning = type
	}

	@Mutation // 设置侧边栏数据列表
	public SetHeaderSelectedKey(item: string) {
		this.headerSelectedKey = item
	}

	@Mutation // 设置侧边栏Key
	public SetSidebarSelectedKey(item: string) {
		this.sidebarSelectedKey = item
	}

	@Mutation // 设置侧边栏数据列表
	public SetSidebarList(item: any[]) {
		this.sidebarList = deepClone(item)
	}

	@Mutation // 设置routerTagKey选中key
	public SetRouterTagKey(item: string) {
		this.routerTagKey = item
	}

	@Mutation // 设置microModelList
	public SetMicroModeList(item: any[]) {
		this.microModelList = deepClone(item)
	}

	@Mutation // 重置routerTag数据
	public ResetRouterTagList(item: any[]) {
		this.routerTagList = deepClone(item)
	}

	@Mutation // 设置header的数据列表
	public SetLayoutRouterDate(item: any[]) {
		this.layoutRouterData = clone(isArray(item) ? item : [])
	}

	@Mutation // 设置路由标签列表数组
	public AddDeleteRouterTagList(item: routerTagListOperate) {
		const { data, type, isAdd = false } = item
		if (!isTrue(data)) return
		// 添加微前端类型 用来微前端判断
		data.microType = data.microType ?? import.meta.env.VITE_MICRO_TYPE
		data.microId = data.microId ?? import.meta.env.VITE_APP_ID
		if (type === 'add') {
			if (!this.routerTagList.map((item) => item.path).includes(data.path) || isAdd) {
				const pushData = deepClone(this.routerTagList)
				pushData.push(data)
				this.routerTagList = pushData
			} else {
				return
			}
		} else if (type === 'delete') {
			this.routerTagList = this.routerTagList.filter((item) => data.path !== item.path)
		}

		// micro通信处理
		microSetRouterTag(item)
	}
}
export const erpLayoutModule = Layout
