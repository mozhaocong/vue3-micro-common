import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import initRouter from './utils/initRouter'
import { apiGetPermission, authorizations } from '@/api/erp/login'
import { requestJudgment } from '@/utils'
import { loginAgain } from '@/store/modules/erp/public/utils/routerOperation'

@Module({ store, name: 'erpLogin', namespaced: true, dynamic: true })
class Login extends VuexModule {
	public token = localStorage.getItem('Authorization') || ''
	public owm = {}

	@Action // 项目初始化  获取项目个人信息（用户名称，用户路由限制）， 每次项目打开都会调用一次，来加载对应的页面路由
	public async appDataInit() {
		// 获取用户信息相关的数据
		const res = await apiGetPermission({})
		if (requestJudgment(res)) {
			this.SET_OWM(res.data)
			this.SET_TOKEN(localStorage.getItem('Authorization') || '')
		}
		initRouter(res.code === 0 ? res : {})
	}
	@Mutation
	private SET_OWM(data: ObjectMap) {
		this.owm = data
	}

	@Action //用户登录操作
	public async onLogin(data?: ObjectMap) {
		const res: any = await authorizations(data || {})
		if (!res.code) {
			this.SET_TOKEN(res.data.token_type + ' ' + res.data.access_token)
			this.appDataInit()
		}
	}
	@Mutation
	private SET_TOKEN(token: string) {
		this.token = token
		localStorage.setItem('Authorization', token)
		sessionStorage.setItem('Authorization', token)
	}

	@Action
	public async signOut() {
		loginAgain()
	}
}
export const erpLoginModule = getModule(Login)
